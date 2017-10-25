/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-locationviewrelationsinversetabview', function (Y) {
    "use strict";
    /**
     * Provides the Location View Relations Inverse Tab view class.
     *
     * @module ez-locationviewrelationsinversetabview
     */
    Y.namespace('eZ');

    /**
     * The Location View Relations Inverse tab class.
     *
     * @namespace eZ
     * @class LocationViewRelationsInverseTabView
     * @constructor
     * @extends eZ.LocationViewTabView
     */
    Y.eZ.LocationViewRelationsInverseTabView = Y.Base.create('locationViewRelationsInverseTabView', Y.eZ.LocationViewTabView, [Y.eZ.AsynchronousView], {
        initializer: function () {

            this._fireMethod = this._fireLoadDataEvent;
            this._watchAttribute = 'items'
        },

        render: function () {

            var container = this.get('container');

            container.setHTML(this.template({

                "items":this.get('items'),
            }));

            return this;
        },

        _getContentId: function () {
            //TODO
            return true;
        },

        _fireLoadDataEvent: function () {
            //TODO Get the contentID from _getContentId above !

            var uri = '/contentinverserelations/171';

            Y.io(uri, {
                method: 'GET',
                on: {
                    success: function (tId, response) {

                        var items = JSON.parse(response.response);
                        this._set('items', items);

                    }
                },
                context: this
            });

        },

    }, {
        ATTRS: {
            /**
             * The title of the tab
             *
             * @attribute title
             * @type {String}
             * @readOnly
             */
            title: {
                valueFn: function () {
                    return Y.eZ.trans('Related Inverse', {}, 'relationsinverse');
                },
                readOnly: true,
            },

            /**
             * The identifier of the tab
             *
             * @attribute identifier
             * @type {String}
             * @default "relations"
             * @readOnly
             */
            identifier: {
                value: "relationsinverse",
                readOnly: true,
            },
            /**
             * Related Inverse Items
             *
             * @attribute items
             * @type {array}
             */
            items: {},
        }
    });
});
