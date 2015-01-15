/**
 * Chrome new page extension to display featured content and artists from Crated
 * Currently only features art pieces but could be a mix of artist and art
 * pieces. The goal is to promote artists and their art.
 */
(function IIFE () {
    'use strict';

    // to be replaced with an API call when Crated has a public API
    var data = {
        'page': null,
        'limit': null,
        'art': [ {
            'id': 122277,
            'name': 'All City IV (2013)',
            'artist_name': '3ark',
            'artist_slug': '3ark',
            'description': 'Hong Kong is well known for being incredibly dense, vertical, and dynamic. Newcomers quickly feel as though they are part of a towering machine that has a life all its own. Perhaps it does.',
            'urls': {
                'artist': '/3ark',
                'art': '/art/122277/all-city-iv--2013--by-3ark'
            },
            'thumbnails': {
                'xlarge': 'http://static2.crated.com/BXxnxsysT4At2806HtG4Fom1rvY=/fit-in/960x960/filters:quality(90)/crated/thumbs/art/2014/11/27/007c346dcdba0ca9cba7f10942d4b897/960.jpg'
            }
        }, {
            'id': 138617,
            'name': 'Spaceship',
            'artist_name': 'bogdan.draghici',
            'artist_slug': 'bogdan',
            'description': '',
            'urls': {
                'artist': '/bogdan',
                'art': '/art/138617/spaceship-by-bogdan'
            },
            'thumbnails': {
                'xlarge': 'http://static3.crated.com/627NbEk2uNLvBBysUQIaHvGwytE=/fit-in/960x960/filters:quality(90)/crated/thumbs/art/2015/01/12/2dfecb6ea6ccdd39afb674e5f33098a4/960.jpg'
            }
        } ]
    };

    // regex used to match template markers
    var reTemplate = /\{\{(.+?)\}\}/g;

    // cached elements
    var el = document.getElementById( 'art' );

    // store original template string
    var tpl = document.getElementById( 'templateArt' ).innerHTML;

    /**
     * Retrieve the value of an object from a string. This is useful when the string
     * contains a dot notation
     *
     * @example
     * var obj = {
     *     a: {
     *         b: {
     *             c: true
     *         }
     *     }
     * };
     * getObjectByString( obj, 'a.b.c' );
     * // returns true
     *
     * @param  {Object} obj   Object to retrieve value from
     * @param  {String} str   String of object properties
     * @param  {Object} [map] Optional map for fallback values
     * @return {Mixed}
     */
    function getObjectByString ( obj, str, map ) {
        var fallback = obj[ map[ str ] ] || '';

        str = str.split( '.' );
        for ( var i = 0; i < str.length; i += 1 ) {
            obj = obj[ str[ i ] ];
        }

        return obj || fallback;
    }

    /**
     * Retrieve populated template string based on matching object values
     *
     * @param  {String} str Template string
     * @param  {Object} obj Data object
     * @return {String}
     */
    function getTemplateString ( str, obj ) {
        var match;

        // run through the template string as many time as needed to replace all
        // template markers with the associated value from the data object
        while ( ( match = reTemplate.exec( str ) ) ) {
            str = str.replace(
                match[ 0 ],
                getObjectByString( obj, match[ 1 ], {
                    'artist_name': 'artist_slug'
                } )
            );
        }

        return str;
    }

    // render the view with a random art piece
    el.innerHTML = getTemplateString( tpl, data.art[ Math.floor( Math.random() * data.art.length ) ] );

} () );
