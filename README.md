# gen-i18n

Salve the pain of generating translation resource files and transforming hard coded application text into translation keys.

Note this project is meant for one-time use to localize an existing application, not for ongoing key generation.  It may be more useful as an example script if you need heavy customization.

## Installation

`npm install -g sconno05/gen-i18n`

## geni18n

Generates a key file from a flat `.txt` file of application strings.

`geni18n 'path/to/source.txt' 'path/to/destination.json'`

Note: Supports JSON, YAML and iOS strings files

By default, the destination file will be replaced.  Use the *append* option to add to an existing file.

`geni18n 'path/to/source.txt' 'path/to/destination.json' --append`

## replacei18n

Replaces hard coded strings in application files with translation keys.

`replacei18n 'path/to/keys.json' '**/*.html'`

## crushi18n

Replaces strings in a key file with a new string

`crushi18n 'path/to/keys.json' 'path/to/crushed.json'`

By default, strings are replaced with the `_` character.  Pass `--with=X` to replace with any string.

## extracti18n

Extracts hard coded strings to a flat .txt file. Useful for identifying strings that are not referenced as keys yet.

`extracti18n '**/*.html' 'path/to/destination.txt'`