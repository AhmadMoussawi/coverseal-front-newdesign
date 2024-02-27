<!-- markdownlint-configure-file {  "MD024": false } -->
# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
All entries should be prefixed with a valid JIRA ticket identifier.
Example format:

```markdown
## [Unreleased] or [MAJOR.MINOR.REV]

### Added

- JIRA-6: Ticket addressing for JIRA-6.

### Changed
### Removed
### Fixed
```

## Add entries after this line for automatic merging

## [Unreleased]

## [2.3.3] - 2022-03-10

* Add tricks to have another poster image for youtube video
* Avoid contacting the cms with an unknown locale in price-request
* Enable CORS origin on all API routes
* Delete uploaded file from disk after usage, successful or failed

## [2.3.2] - 2022-03-01

* Add support for es-ES and fr-LU

## [2.3.1] - 2022-02-26

* Remove video button on country page
* Attach fr-LU to CMS fr-BE

## [2.3.0] - 2022-02-23

* Move hardcoded country list in english to cms with translation
* Fix bug where some countries with SAV return a 404
* Add field user come from into price request from

## [2.2.3] - 2022-02-18

* Disable attachment

## [2.2.2] - 2022-02-16

* Fix wrong condition on page before configurator

## [2.2.1] - 2022-02-11

* Update conditional rendering based on country

## [2.2.0] - 2022-02-10

* Save language choice in cookies and validate this part

## [2.1.4] - 2022-02-09

* Update site languages

## [2.1.3] - 2022-01-21

* On EN and DE, contact page button for after sale is a "mailto:" addresses encoded in the CMS

## [2.1.2] - 2022-01-13

* Add zip_code field to partnerships form
* Add simplified country list.
* Add country help text
* Update area detection accordingly with CMS
* Remove cc mail for business department and instead send a mail with the CMS data directly

## [2.1.1] - 2021-12-27

* Fix bug with newsletter api route since refactor

## [2.1.0] - 2021-12-26

* Update dependencies to latest
* Refactor api handler to use middleware approach
* Optimize image management by using stream instead of memory buffer
* Reduce code duplication

## [2.0.12] - 2021-12-24

* Fix bug where formsMessages where undefined in Layout component

## [2.0.11] - 2021-12-10

* Make sure the codebase is not deployed on the production machine, only the build

## [2.0.10] - 2021-12-01

* Add custom_id to by pass missing id in Directus webhooks

## [2.0.9] - 2021-11-26

* Fix bug where uncorrect translation where used on page achievements category

## [2.0.8] - 2021-11-24

* Update country page
* Fix build time issues

## [2.0.7] - 2021-11-19

* Add country page
* Handle country redirection
* Update dependencies to latest

## [2.0.6] - 2021-11-10

* Add missing target blank on external links

## [2.0.5] - 2021-11-10

* Get app version as env variable using package.json as source of truth
* Adapt form component to switch to a success message instead of displaying notification.
* Disable appearing menu animation

## [2.0.4] - 2021-11-07

* Add checkbox to receive a catalog on price request form
* Remove autoFormat phone form
* Update after sale icon side nav
* Adapt required fields on price request and catalog request forms

## [2.0.3] - 2021-11-03

* Update side nav icon after sale
* Add side nav item partnerships
* On partnerships form, update type when switching language
  
## [2.0.2] - 2021-11-03

* Fix bug where partnerships form return 404 with DE and EN languages.

## [2.0.1] - 2021-11-01

* Move some models_template fields to models.
* Replace SAV form on home page by catalog request
* Add changelog file
* Remove unused Siema dependency
