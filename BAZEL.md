# Bazel

You may have noticed some `BUILD.bazel` files throughout the repository. We are in the process of
building everything here with [Bazel](https://bazel.build/), so that day 1 setup is simplified and
so that test tooling can be shared between languages. We also want to cache tests so that editing
README.md doesn't involve running all of our Go tests.

Because people depend on installing `github.com/pachyderm/pachyderm/v2` with "go get", we can never
fully convert to only using Bazel as the build system. Rather, we will use both Bazel and `go.mod`
for the foreseeable future. Hence, we check in all of our generated code (eschewing Bazel's proto
generation rules, etc.).

## Setup

To run `make proto`, you will now need Bazel. The best way to install Bazel is by installing
Bazelisk as the `bazel` binary in your path:

https://github.com/bazelbuild/bazelisk/blob/master/README.md

`brew install bazelisk` does this for you automatically. If you download and install the binary
manually, move it to somewhere in `$PATH`, set it executable, and name it `bazel`.

Once Bazelisk is installed, it will fetch the version of Bazel specified in the file
`.bazelversion`, and use that. If the repository needs features in a newer version, you will
automatically update the next time you run a Bazel command. You shouldn't need to ever update
Bazelisk, but feel free of course.

Note: you will need a C++ compiler installed. `apt install build-essential` on Debian, or do the
xcode dance on Mac OS. The C++ compiler is used to build some internal Bazel tools like the shell
script wrapper.

Note: Every time you update Mac OS, you need to run
`/usr/sbin/softwareupdate --install-rosetta --agree-to-license`. Some of our dependencies don't
build `darwin_arm64` binaries, and we fall back to `darwin_amd64` binaries. Rosetta is what lets
M1/M2/M3 Macs run `amd64` binaries. You will see `Bad CPU type in executable` if Rosetta isn't
working. (You may need to run `bazel shutdown` after installing Rosetta, though this is only
suggested by Apple and doesn't appear to be required 100% of the time.)

Note: you will need a Python 3 interpreter installed as `python3`. `apt install python3` on Debian.
This is because `rules_python` uses the host `python3` to find the version of Python installed via
`rules_python` in `MODULE.bazel`.

### Setup at Pachyderm

If you'd like to use the shared build cache, join the Buildbuddy organization by logging in with
your pachyderm.io Google account:

https://pachyderm.buildbuddy.io/join/

From there, you'll get an API key. Add lines to `.bazelrc.local` like this:

    build --config=remotecache
    build --remote_header=x-buildbuddy-api-key=<key>

Then you will be using our shared cache, and your invocation URLs (which contain build logs, test
logs, profiles, etc.) will be share-able with your teammates.

Note: this feature leaks your username, hostname, and the names of environment variables (but not
the values!) on your workstation to other team members. If any of those are work-inappropriate,
maybe fix that before you add your key!

### Setup in the office

If you work in the office, you won't be able to use the remote cache. GRPC is disallowed on the
network and the remote cache uses GRPC.

You will also need to tell Bazel to trust the TLS MITM certificate, as the build will download
dependencies from the Internet. On Debian or Ubuntu, install `ca-certificates-java`, add the MITM
proxy's certificate file to `/etc/ssl/certs`, then run `sudo update-ca-certficates`.
`update-ca-certificates` copies all certs in `/etc/ssl/certs` into the Java "trust store", which is
how Java programs (which Bazel is) get trusted certs. Then tell Bazel to use the system trust store
by adding to `/etc/bazelrc` or `$HOME/.bazelrc`:

    startup --host_jvm_args=-Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts \
            --host_jvm_args=-Djavax.net.ssl.trustStorePassword=changeit

(Yes, it appears that you need a password to read certs on your own system, and the password is
literally `changeit`.)

Note that just grabbing a Java trust store with the MITM certificate isn't sufficient. `bazelisk`
downloads `bazel` whenever we use a new version of Bazel, and `bazelisk` is written in Go, which
needs the cert in `/etc/ssl/certs`.

## Use

## Write Go code

Writing Go code works like it always did. Your editor can understand the entire source tree without
any help. Whenever you add or delete files, or change dependencies, run `bazel run //:gazelle` to
update the associated BUILD files for Bazel.

## Lint Go code

Go code is automatically linted as it's compiled. Errors will be reported during compilation like:

    compilepkg: nogo: errors found by nogo during build-time code analysis:
    src/internal/lokiutil/client/client_test.go:18:1: TestMain should call os.Exit to set exit code (SA3000)

To ignore this error, add a `//nolint:SA3000` comment. The part after nolint:, `SA3000`, comes from
the expression in parentheses at the end of the error message. Following the linter's advice is our
policy, so nolint directives should be treated with great suspicion during code reviews. (The error
in the example output above is a bug and should be fixed, not ignored.)

Lint checks we use:

1. `govet`: `go tool vet`
1. `SA*`: staticcheck, https://staticcheck.dev/docs/checks#SA
1. `S*`: simple (code simplifications), https://staticcheck.dev/docs/checks#S
1. `ST*`: stylecheck, https://staticcheck.dev/docs/checks#ST
1. `U1000`: unused, https://staticcheck.dev/docs/checks#U
1. `ineffassign`: https://github.com/gordonklaus/ineffassign
1. `wrapcheck`: https://github.com/tomarrell/wrapcheck
1. `errcheck`: https://pkg.go.dev/github.com/kisielk/errcheck/errcheck
1. `depguard`: https://github.com/OpenPeeDeeP/depguard/tree/v2
1. `asasalint`: https://github.com/alingse/asasalint
1. `asciicheck`: https://github.com/tdakkota/asciicheck
1. `bidichk`: https://github.com/breml/bidichk
1. `goprintffuncname`: https://github.com/jirfag/go-printf-func-name
1. `exhaustive`: https://pkg.go.dev/github.com/nishanths/exhaustive
1. `gofmt`, checks that code is formatted with `gofmt -s`. gopls does this for you on save.

Most linters are customized somewhere in the `//src/internal/analyzers/...` hierarchy.
`golangci-lint` used a YAML file; we mostly use pure Go to configure these linters now, so check
that directory for customization / override options.

`nogo.json` contains some global excludes, so that dependencies and generated code aren't linted.

## Write Python code

For the Jupyter extension, see [jupyter-extension/BAZEL.md](jupyter-extensions/BAZEL.md).

## Regenerating protos

Right now, `make proto` calls out to `bazel run //:make_proto` to generate the Go protos. When you
run `make proto`, you're getting your first taste of Bazel. CI checks that you remembered to run
this after editing protos.

## Managing dependencies

Our repository is compatible with the traditional `go` toolchain in addition to Bazel. If you add or
remove dependencies, run `bazel run //:go mod tidy` to update go.mod and go.sum, `bazel mod tidy` to
make Bazel aware of the changes to go.mod and go.sum, and run `bazel run //:gazelle` to update BUILD
files. Then run a build or test. Also consider running `bazel run :buildifier` to reformat the BUILD
files.

The `bazel-style-tests` in CircleCI ensure you did all of this correctly.

## Run Go

If you'd like to invoke the version of Go used internally, run `bazel run //:go`. For example
`bazel run //:go mod tidy` will tidy go.mod and go.sum (which Bazel uses to load dependencies).

## Build containers

The containers are defined in the `oci/` directory. `bazel build //oci:pachd_image`, for example,
will build a container image compiled for linux on your host machine's architecture. You can
manipulate this image with `skopeo inspect oci:bazel-bin/oci/pachd_image ...`.
[Skopeo](https://github.com/containers/skopeo/blob/main/docs/skopeo.1.md) is available from
`//tools/skopeo`, or you can grab it from your package manager. (It's just a suggestion to use this;
it's not needed for building or anything.)

There are a few targets that build the containers; `pachd_image`, `pachctl_image`, and
`worker_image` are images targeting the architecture of the build machine (or
[--cpu](https://bazel.build/docs/user-manual#cpu) bazel flag). `pachd`, `pachctl`, and `worker` are
multi-arch "image indexes".

To push containers to your local docker daemon (for `docker run`), run `bazel run //oci:load` or
just `load_pachctl`, etc. `pachctl` is the only container that's easy to run locally with Docker,
the rest require databases and all that good stuff, so you'll likely never need this.

To push containers to production (for releases), run `bazel run --stamp //oci:push`. This writes to
DockerHub as the user in your `~/.docker/config.json` file. If you aren't careful, you could
silently overwrite production images with garbage. Only CI should be running this command, but if
you know what you're doing, you can run it.

A program called `pachdev` manages local development environments, so you should never need to
manually load or push containers. See [LOCAL.md](LOCAL.md) for details.

## Run Tests

`bazel test ...` will run all tests. Test caching means tests whose results couldn't have changed
since the last time they were run will not actually be run, so if you're just editing one file it's
not much slower to run this. You can also pick the test you want to run, like
`bazel test //src/internal/archiveserver:archiveserver_test`. `--test_output=streamed` will show you
the messages from the test as they run (overwhelming if `...`), otherwise, bazel will print the path
of the test logs for failing tests. They are also available in the BuildBuddy UI.

For more Go details, see
https://github.com/bazelbuild/rules_go/blob/master/docs/go/core/rules.md#go_test

In the past, many tests had dependencies on a freshly-built `pachctl` or `match` binary. This is not
the case if you run the tests with Bazel; Bazel automatically includes the version of those binaries
based on your working tree in the test's environment.

### Run one test case

`bazel test //the:test --test_filter=TestCaseIWantToRun`

## Tools

### Gazelle

[Gazelle](https://github.com/bazelbuild/bazel-gazelle) is a tool that generates BUILD files based on
Go and Python source code. `bazel run //:gazelle` will run it. You'll need to run it when you add
new Go source files, packages, or change dependencies.

It addresses this sort of error:

```
compilepkg: missing strict dependencies:
        /tmp/bazel-working-directory/_main/src/server/auth/server/testing/admin_test.go: import of "github.com/pachyderm/pachyderm/v2/src/internal/pctx"
No dependencies were provided.
Check that imports in Go sources match importpath attributes in deps.
```

### Buildifier

If you edit BUILD, .bzl, etc. files, run `bazel test //:buildifier_test` (potentially with
`--test_output=all`) to see if you introduced any lint errors in them. If you did, run
`bazel run //:buildifier` to auto-fix them. You can also install
[buildifier](https://github.com/bazelbuild/buildtools/blob/master/buildifier/README.md) and have
your editor run it on save for `*.bazel` files. Be aware that the lint rules change based on the
dialect of Starlark (raw Starlark, BUILD.bazel, WORKSPACE, etc.), so your editor needs to tell
`buildifier` the filename it's editing. If not, you will still have lint errors in your saved files.

If you'd like to invoke the version of Go used for proto generation, run `bazel run //:go`.

### Buildozer

If the build prints something like **You can use the following buildozer command to fix these
issues:**, use `bazel run //:buildozer` to invoke
[buildozer](https://github.com/bazelbuild/buildtools/blob/master/buildozer/README.md) as per the
printed instructions.

## Binaries

### pachctl

To run pachctl, `bazel run //:pachctl`.

If you want to install `pachctl` from this source tree, run
`bazel run --stamp //src/server/cmd/pachctl:install` or `bazel run //src/serer/cmd/pachctl:install`.
`--stamp` causes a version number to be baked into the installed binary, which enables server/client
compatability checks. Without `--stamp`, the installed binary behaves like
`go install ./src/server/cmd/pachctl`. From a release tag, you probably want the stamped version.

It can be confusing to install an unstamped pachctl binary, because you won't know how new the
pachctl is and whether the error you're seeing is something introduced in a random branch you're
working on or if it's a bug in the released version, but you'll probably figure it out. `install`
prioritizes wiping out whatever's first in $PATH, so... you can fix the problem by reinstalling from
a known branch.

## Hints

`bazel run //target -- ...` prevents `...` from being interpreted as an argument to Bazel, which is
useful if you are passing flags to something you're `bazel run`ning.

`bazel query 'deps("//some:target")'` will list all dependencies of `//some:target`.

`bazel query 'somepath("//some:target", "@@some_library//:whatever")` will show a dependency chain
from `//some:target` to `@@some_library//:whatever`. `allpaths` will show all the chains.

`bazel query --output=build ...` will show a BUILD file representing the matched rules.

### ibazel

Bazel can restart a program or rerun a test whenever its dependencies change on disk. It can also
run `gazelle` for you automatically.

Start by installing the bundled ibazel. `bazel run //tools/ibazel` won't work, because ibazel runs
bazel, and bazel is already running.

    $ bazel run //tools/ibazel:install

This will install it to a "good" location on your $PATH. If you don't like its choice, you can pass
the desired location to the :install target:

    $ bazel run //tools/ibazel:install /home/you/go/bin

That would install ibazel to `/home/you/go/bin/ibazel`.

Once you have it installed, you can run `ibazel` like `bazel`, except that the target will be rerun
when its dependencies change.

To run the PFS tests while you're working on PFS:

    $ ibazel test //src/server/pfs/... --test_output=streamed

To rerun pachctl while you're working on it:

    $ ibazel run //:pachctl -- list repo -v

To push Pachyderm to Kubernetes whenever you change its code:

    $ ibazel run //src/testing/pachdev push

`ibazel` works best if you edit the code less quickly than it takes to run the tests. That means
it's ideal for things in `//src/internal`. Less ideal for pushing Pachyderm on every change. But it
does work, if you really want that.

### protoc

Gazelle likes to regenerate the protos included with go modules. We have a lot of entries in
`MODULE.bazel` to suppress this behavior:

```starlark
go_deps.gazelle_override(
    directives = [
        "gazelle:proto disable_global",
    ],
    path = "github.com/opentracing/basictracer-go",
)
```

To find more of these to add, do something like:

    bazel query 'somepath("...", "@rules_go//proto:protoc")'

(Note that ... is 3 literal dots, it's not a suggestion to type something else. The first argument
is the "Universe" in which to search for dependencies.)

To find even more, do something like:

    bazel query 'rdeps("...", "@@zlib~1.3//:zutil.h")'

(protoc depends on zlib, which has a file called zutil.h; this shows anything in ... that ends up
depending on that file.)

### realenv

Realenv tests require that `CGO_ENABLED=0`. This means that tests that use realenv will have to set
`pure = "on"` in the `go_test` target. To do that, find the reverse dependencies of realenv:

    $ bazel query 'kind("go_test", rdeps("...", "//src/internal/testpachd/realenv"))'
    //src/internal/collection:collection_test
    //src/internal/fileserver:fileserver_test
    ...

Then use buildozer to adjust those targets:

    $ bazel build //:buildozer
    $ bazel query 'kind("go_test", rdeps("...", "//src/internal/testpachd/realenv"))' | \
      xargs bazel-bin/buildozer 'set pure "on"'
    fixed /home/jrockway/pach/gazelle/src/server/auth/server/testing/BUILD.bazel
    fixed /home/jrockway/pach/gazelle/src/server/pfs/server/testing/BUILD.bazel
    ...

This will not print anything if everything is already fixed, so you can run this freely and know
whether or not it affected anything.

### Profiling

Sometimes you want a whole-system profile of some tests running or something. Build the Go binaries
in debug mode with `-c dbg` to get the symbols, and run the tests outside of the Bazel sandbox with
`--spawn_strategy=local` so that `hotspot` can later find the binaries to inspect.

For example, to see what is making a database-based test slow, pick one at random and run 64 copies
at the same time:

    perf record -F 99 -e cpu-clock -ag -- bazel test //src/server/auth/server/testing:auth_test -c dbg \
    --test_filter=TestListRepoNotLoggedInError --runs_per_test=64 --jobs=64 --local_test_jobs=64

Then look at `perf.out` with `hotspot`:

    hotspot perf.out

This did not help with debugging database speed, but I wanted to document it anyway.

### ssh-ing to CI

Sometimes your tests will fail in CI, but not on your workstation. Traditionally, you would click
"Rerun with SSH" in Circle. You can still do that, but you can also `bazel run //etc/ci-image:run`
to be placed in a shell that is configured identically to CI; CI uses the same Docker image. Your
current working copy of Pachyderm will be mounted in `/home/circleci/project`, just like CI. You can
edit files on your workstation and they are immediately there; it's just a read-only bind mount. You
can run `git` or `bazel` inside this environment as well. While converting to Bazel, I've had a lot
of weird failures on CI, and this has always solved them without wasting time waiting for CI to
restart!

### Code coverage

`bazel coverage //some/test:target` will generate a combined coverage report for your tests. To view
it, install [lcov](https://github.com/linux-test-project/lcov) (often available as an OS package;
it's written in Perl so we don't vendor it in `//tools`), and then run:

```
genhtml --output genhtml "$(bazel info output_path)/_coverage/_coverage_report.dat"
```

Then view `genhtml/index.html` in your browser:

```
chrome genhtml/index.html
```

### Log spam

Building container images might print a bunch of messages like:

    time="2024-10-18T18:38:38-04:00" level=warning msg="Changing credential host for registry" host=docker.io new="https://registry-1.docker.io" orig="https://index.docker.io/v1/"

You can make this go away by deleting one of those entries from ~/.docker/config.json. Sigh!
