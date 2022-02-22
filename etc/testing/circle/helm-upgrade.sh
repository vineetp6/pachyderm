#!/bin/bash

set -ex

# shellcheck disable=SC1090
source "$(dirname "$0")/env.sh"

helm upgrade pachyderm etc/helm/pachyderm -f etc/testing/circle/helm-values.yaml

kubectl wait --for=condition=ready pod -l app=pachd --timeout=5m

pachctl config update context "$(pachctl config get active-context)" --pachd-address="$(minikube ip):30650"