#!/bin/bash
GET_ALL_BOTTLES_OF_WINE_ZIP="getAllBottlesOfWine.zip"
function update_getAllBottlesOfWine {
    if [ -f $GET_ALL_BOTTLES_OF_WINE_ZIP ]; then
        echo "Removing $GET_ALL_BOTTLES_OF_WINE_ZIP"
        rm $GET_ALL_BOTTLES_OF_WINE_ZIP
    fi

    zip $GET_ALL_BOTTLES_OF_WINE_ZIP getAllBottlesOfWine.js
    aws lambda update-function-code --function-name getAllBottlesOfWine --zip-file=fileb://getAllBottlesOfWine.zip
    aws lambda update-function-configuration --function-name getAllBottlesOfWine --handler getAllBottlesOfWine.handler
}

case "$1" in
    getAllBottlesOfWine)
        update_getAllBottlesOfWine
        ;;
    *)
        echo "$1 not found"
esac