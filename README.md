
<div align="center">

  [![dependencies Status](https://david-dm.org/iamacup/alumnibase-survey/status.svg)](https://david-dm.org/iamacup/alumnibase-survey)
  [![devDependencies Status](https://david-dm.org/iamacup/alumnibase-survey/dev-status.svg)](https://david-dm.org/iamacup/alumnibase-survey?type=dev)
  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

</div>

Getting Started
-------

**1. You can start by cloning the repository on your local machine by running:**

```bash
git clone https://github.com/iamacup/alumnibase-survey.git
```

**2. Install all of the dependencies:**

```bash
yarn install
```

**3. Start to run it locally (will point the api endpoint to local.alumnibase.com:8080):**

```bash
yarn local
```

**To the following other options are available to start:**

You will then need to run the following two commands:

```bash
yarn remoteprep
cd workdir
```

Followed by either of these two combinations:

In order for this to run locally, you will need to edit the package.json and provide a port for start:dev command under betterScripts - it will point the api endpoint to beta-api.alumnibase.com

```bash
yarn build:dev && yarn start:dev
```

In order for this to run locally, you will need to edit the package.json and provide a port for start:prod command under betterScripts - it will point the api endpoint to api.alumnibase.com

```bash
yarn build:prod && yarn start:prod
```

The API
-------

This project comprises only the front-end. Documentation for the API is not currently available.

Commercial Licenses
-------

We have included some dependencies (wowjs, formvalidation.io) etc. which we own licenses for - if you are using this as a whole project - there are some project dependencies that are not free for commercial use. Sorry! 

Contact
-------

If you have a specific feature request or find a bug, [please open a GitHub issue](https://github.com/iamacup/alumnibase-survey/issues/new). We encourage you to fork these docs for local reference and happily accept pull requests with improvements.

Conduct
-------

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/iamacup/alumnibase-data/blob/master/CONDUCT.md). By participating in discussions about this project, you agree to abide by these terms.

