# gen-i18n

Salve the pain of generating translation resource files and transforming hard coded application text into translation keys.

Note this project is meant for one-time use to localize an existing application, not for ongoing key generation.  It may be more useful as an example script if you need heavy customization.

## Installation

`npm install -g sconno05/gen-i18n`

## geni18n

Generates a key file from a flat `.txt` file of application strings.

`geni18n 'path/to/source.txt' 'path/to/destination.json'`

Note: JSON is the only extension currently supported.

## replacei18n

Replaces hard coded strings in application files with translation keys.

`replacei18n 'path/to/keys.json' '*.html'`
