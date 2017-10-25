YUI.add('ez-tabrelationinverseview', function (Y) {

    Y.namespace('TabRelationInverseView.Plugin');

    Y.TabRelationInverseView.Plugin = Y.Base.create('tabRelationInverseView', Y.Plugin.Base, [], {
        initializer: function () {
            var TabLocationView = this.get('host'),
                TabRelationInverseView = this.get('tabRelationInverseView');

            TabLocationView.addTabView(TabRelationInverseView);
        }
    }, {
        NS: 'tabRelationInverseView',
        ATTRS: {
            /**
             * The content associated the current location
             *
             * @attribute content
             * @type Y.eZ.Content
             */
            content: {},
            tabRelationInverseView: {
                valueFn : function () {
                    return new Y.eZ.LocationViewRelationsInverseTabView({
                        content: this.get('content'),
                        contentType: this.get('contentType'),
                        config: this.get('config'),
                        priority: 800,
                        selected: false,
                        bubbleTargets: this.get('host'),
                    });

                },
                writeOnce: 'initOnly',
            }
        }
    });

    Y.eZ.PluginRegistry.registerPlugin(
        Y.TabRelationInverseView.Plugin, ['locationViewView']

    );
});