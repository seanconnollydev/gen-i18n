# gen-i18n

A set of utility functions to assist with creating and maintaining resource keys and files in a multi-language application.

## Installation

`npm install -g sconno05/gen-i18n`

## geni18n

Generates a key file from a flat `.txt` file of application strings.

`geni18n --src=path/to/source.txt --dest=path/to/destination.json`

Supports JSON, YAML and iOS strings files

By default, the destination file will be replaced.  Use the *append* option to add to an existing file.

`geni18n 'path/to/source.txt' 'path/to/destination.json' --append`

Note: this function is meant for one-time use to localize an existing application, not for ongoing key generation.  It may be more useful as an example script if you need heavy customization.

## replace

Replaces hard coded strings in application files with translation keys.

`geni18n replace --keys=path/to/keys.json --path='**/*.html'`

## crush

Replaces strings in a key file with a new string

`geni18n crush --keys=path/to/keys.json --dest=path/to/crushed_keys.json`

By default, strings are replaced with the `_` character.  Pass `--with=X` to replace with any string.

## extract

Extracts hard coded strings to a flat .txt file. Useful for identifying strings that are not referenced as keys yet.

`geni18n extract --path='**/*.html' dest=path/to/destination.txt`

## prune

Removes keys from a key file that are not in use

`geni18n prune --keys=path/to/keys.json --path='**/*.html'`
