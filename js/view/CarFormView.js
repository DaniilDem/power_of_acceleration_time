/**
 * Created by Daniil on 11.10.2016.
 */
var CarFormView = Backbone.View.extend({

    el: "#carForm",

    events: {
        "keyup #carWeight, #carTime":   "changeInput"
    },

    initialize: function() {

        this.listenTo(this.model, "change:carPower", this.renderPower);

    },

    changeInput:function (e)
    {
        var elem =  $(e.target);

        let carOptionName = elem.attr('id');

        let tempObj = {};
        tempObj[carOptionName] = elem.val();

        this.model.set(tempObj);
    },

    renderPower:function ()
    {
        let carPower = this.model.get('carPower');
        this.$('#carPower').text(parseInt(carPower)+' Hp');

    }

});