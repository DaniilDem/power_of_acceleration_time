var CarFormModel = Backbone.Model.extend({

    defaults: {
        "carWeight":  1100,
        "carTime":     9,
        "carPower":    98
    },

    initialize: function() {
        this.on('change:carWeight change:carTime', this.changeModel)
    },

    changeModel:function ()
    {
        let carWeight = this.get('carWeight');
        let carTime = this.get('carTime');
        let carPower = getResultNetwork({time:carTime, weight:carWeight}, network).hp;
        this.set({'carPower':carPower});
    }

});