PYTHON ?= /Users/keithgohjuankai/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3
PORT ?= 8000
BASE_URL ?= http://127.0.0.1:$(PORT)
NODE_BIN ?= /Users/keithgohjuankai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin
PNPM ?= /Users/keithgohjuankai/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pnpm
PATH_WITH_NODE := $(NODE_BIN):$(PATH)
PYCACHE ?= ./.pycache

.PHONY: run dev build smoke check package package-list pages-preview-check repo-preflight selftest-package final-preflight

run:
	$(PYTHON) server.py $(PORT)

dev:
	PATH="$(PATH_WITH_NODE)" $(PNPM) dev

build:
	PATH="$(PATH_WITH_NODE)" $(PNPM) exec vite build

smoke:
	$(PYTHON) smoke_test.py $(BASE_URL)

check: build
	PYTHONPYCACHEPREFIX="$(PYCACHE)" $(PYTHON) -m py_compile server.py smoke_test.py

pages-preview-check: build
	$(PYTHON) tools/build_static_preview.py

package: build
	$(PYTHON) tools/build_submission.py
	$(PYTHON) tools/audit_submission.py

package-list: package
	$(PYTHON) -m zipfile -l dist/event-buddy-submission.zip

repo-preflight:
	$(PYTHON) tools/public_repo_preflight.py

selftest-package: package
	$(PYTHON) tools/selftest_package.py

final-preflight: selftest-package
	$(PYTHON) tools/final_preflight.py
