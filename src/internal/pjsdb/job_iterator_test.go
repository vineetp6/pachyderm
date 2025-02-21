package pjsdb_test

import (
	"testing"

	"github.com/pachyderm/pachyderm/v2/src/internal/pjsdb"
	"github.com/pachyderm/pachyderm/v2/src/internal/require"
	"github.com/pachyderm/pachyderm/v2/src/internal/storage/fileset"
)

func TestForEachJob(t *testing.T) {
	ctx, db := DB(t)
	s := FilesetStorage(t, db)
	pageSize := uint64(20)
	expected := make(map[pjsdb.JobID]bool)
	got := make(map[pjsdb.JobID]bool)
	withTx(t, ctx, db, s, func(d dependencies) {
		parent := pjsdb.JobID(0)
		var err error
		for i := uint64(0); i <= pageSize+pageSize/2; i++ {
			parent, err = createJob(t, d, parent)
			expected[parent] = true
			require.NoError(t, err)
		}
	})
	err := pjsdb.ForEachJob(ctx, db, pjsdb.IterateJobsRequest{
		IteratorConfiguration: pjsdb.IteratorConfiguration{PageSize: pageSize},
	}, func(job pjsdb.Job) error {
		got[job.ID] = true
		return nil
	})
	require.NoError(t, err)
	require.NoDiff(t, expected, got, nil)
}

func TestForEachJobTxByFilter(t *testing.T) {
	t.Run("valid/parent", func(t *testing.T) {
		withDependencies(t, func(d dependencies) {
			expected := make(map[pjsdb.JobID]bool)
			left, err := createJob(t, d, 0)
			require.NoError(t, err)
			right, err := createJob(t, d, 0)
			require.NoError(t, err)
			withForEachJob(t, d, expected,
				pjsdb.IterateJobsRequest{Filter: pjsdb.IterateJobsFilter{Parent: left}},
				func(expected map[pjsdb.JobID]bool) {
					for i := 0; i < 25; i++ {
						leftChild, err := createJob(t, d, left)
						require.NoError(t, err)
						_, err = createJob(t, d, right)
						require.NoError(t, err)
						expected[leftChild] = true
					}
				})
		})
	})
	t.Run("valid/program_hash", func(t *testing.T) {
		withDependencies(t, func(d dependencies) {
			expected := make(map[pjsdb.JobID]bool)
			targetFs, targetHash := mockAndHashFileset(t, d, "/program", "#!/bin/bash; echo 'hello';")
			withForEachJob(t, d, expected,
				pjsdb.IterateJobsRequest{Filter: pjsdb.IterateJobsFilter{ProgramHash: targetHash}},
				func(expected map[pjsdb.JobID]bool) {
					for i := 0; i < 25; i++ {
						included := createJobWithFilesets(t, d, 0, targetFs, targetHash)
						_, err := createJob(t, d, 0)
						require.NoError(t, err)
						expected[included] = true
					}
				})
		})
	})
	t.Run("valid/program", func(t *testing.T) {
		withDependencies(t, func(d dependencies) {
			expected := make(map[pjsdb.JobID]bool)
			targetFs, targetHash := mockAndHashFileset(t, d, "/program", "#!/bin/bash; echo 'hello';")
			withForEachJob(t, d, expected,
				pjsdb.IterateJobsRequest{Filter: pjsdb.IterateJobsFilter{Program: targetFs}},
				func(expected map[pjsdb.JobID]bool) {
					for i := 0; i < 25; i++ {
						included := createJobWithFilesets(t, d, 0, targetFs, targetHash)
						_, err := createJob(t, d, 0)
						require.NoError(t, err)
						expected[included] = true
					}
				})
		})
	})
	t.Run("valid/program/no_matches", func(t *testing.T) {
		withDependencies(t, func(d dependencies) {
			expected := make(map[pjsdb.JobID]bool)
			targetFs := mockFileset(t, d, "/program", "#!/bin/bash; echo 'hello';")
			withForEachJob(t, d, expected,

				pjsdb.IterateJobsRequest{Filter: pjsdb.IterateJobsFilter{Program: targetFs}},
				func(expected map[pjsdb.JobID]bool) {
					for i := 0; i < 25; i++ {
						_, err := createJob(t, d, 0)
						require.NoError(t, err)
					}
				})
		})
	})
	t.Run("valid/has_input", func(t *testing.T) {
		withDependencies(t, func(d dependencies) {
			expected := make(map[pjsdb.JobID]bool)
			targetInput := mockFileset(t, d, "/inputs/0.txt", "fake data")
			withForEachJob(t, d, expected,
				pjsdb.IterateJobsRequest{Filter: pjsdb.IterateJobsFilter{HasInput: targetInput}},
				func(expected map[pjsdb.JobID]bool) {
					for i := 0; i < 25; i++ {
						program, programHash := mockAndHashFileset(t, d, "/program", "#!/bin/bash; echo 'hello';")
						otherInput := mockFileset(t, d, "/inputs/1.txt", "more fake data")
						included := createJobWithFilesets(t, d, 0, program, programHash, targetInput, otherInput)
						createJobWithFilesets(t, d, 0, program, programHash, otherInput, mockFileset(t, d, "/inputs/2.txt", "even more fake data"))
						expected[included] = true
					}
				})
		})
	})
	t.Run("valid/complex/and", func(t *testing.T) {
		withDependencies(t, func(d dependencies) {
			expected := make(map[pjsdb.JobID]bool)
			targetProgram, targetHash := mockAndHashFileset(t, d, "/program", "#!/bin/bash; echo 'hello';")
			targetInput := mockFileset(t, d, "/inputs/0.txt", "fake data")
			otherProgram, otherHash := mockAndHashFileset(t, d, "/program", "#!/bin/bash; echo 'hi';")
			otherInput := mockFileset(t, d, "/inputs/1.txt", "more fake data")
			withForEachJob(t, d, expected,
				pjsdb.IterateJobsRequest{Filter: pjsdb.IterateJobsFilter{
					Program:  targetProgram,
					HasInput: targetInput}},
				func(expected map[pjsdb.JobID]bool) {
					for i := 0; i < 25; i++ {
						included := createJobWithFilesets(t, d, 0, targetProgram, targetHash, targetInput)
						expected[included] = true
						createJobWithFilesets(t, d, 0, otherProgram, otherHash, otherInput)
						createJobWithFilesets(t, d, 0, targetProgram, []byte("foo"), otherInput)
						createJobWithFilesets(t, d, 0, otherProgram, []byte("foo"), targetInput)
					}
				})
		})
	})
	t.Run("valid/complex/or", func(t *testing.T) {
		withDependencies(t, func(d dependencies) {
			expected := make(map[pjsdb.JobID]bool)
			targetProgram, targetHash := mockAndHashFileset(t, d, "/program", "#!/bin/bash; echo 'hello';")
			targetInput := mockFileset(t, d, "/inputs/0.txt", "fake data")
			otherProgram, otherHash := mockAndHashFileset(t, d, "/program", "#!/bin/bash; echo 'hi';")
			otherInput := mockFileset(t, d, "/inputs/1.txt", "more fake data")
			withForEachJob(t, d, expected,
				pjsdb.IterateJobsRequest{Filter: pjsdb.IterateJobsFilter{
					Operation: pjsdb.FilterOperationOR,
					Program:   targetProgram,
					HasInput:  targetInput}},
				func(expected map[pjsdb.JobID]bool) {
					for i := 0; i < 25; i++ {
						expected[createJobWithFilesets(t, d, 0, targetProgram, targetHash, targetInput)] = true
						expected[createJobWithFilesets(t, d, 0, targetProgram, targetHash, otherInput)] = true
						expected[createJobWithFilesets(t, d, 0, otherProgram, otherHash, targetInput)] = true
						createJobWithFilesets(t, d, 0, otherProgram, otherHash, otherInput)
					}
				})
		})
	})
}

func TestIterateJobsFilterIsEmpty(t *testing.T) {
	filter := pjsdb.IterateJobsFilter{}
	require.True(t, filter.IsEmpty())
	filter.HasInput = fileset.Pin(0) // empty, but non-nil slices should also be considered empty.
	require.True(t, filter.IsEmpty())
	filter.HasInput = fileset.Pin(1)
	require.False(t, filter.IsEmpty())
}

func withForEachJob(t *testing.T, d dependencies, expected map[pjsdb.JobID]bool, req pjsdb.IterateJobsRequest, f func(expected map[pjsdb.JobID]bool)) {
	got := make(map[pjsdb.JobID]bool)
	f(expected)
	err := pjsdb.ForEachJobTxByFilter(d.ctx, d.tx, req,
		func(job pjsdb.Job) error {
			got[job.ID] = true
			return nil
		})
	require.NoError(t, err)
	require.NoDiff(t, expected, got, nil)
}
