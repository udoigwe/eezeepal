!(function (a) {
    "use strict";
    var t = function () {};
    (t.prototype.init = function () {
        a("#basic-colorpicker").colorpicker(),
            a("#hex-colorpicker").colorpicker({ format: "auto" }),
            a("#component-colorpicker").colorpicker({ format: null }),
            a("#horizontal-colorpicker").colorpicker({ horizontal: !0 }),
            a(".clockpicker").clockpicker({ donetext: "Done" }),
            a("#single-input").clockpicker({ placement: "bottom", align: "left", autoclose: !0, default: "now" }),
            a("#check-minutes").click(function (t) {
                t.stopPropagation(), a("#single-input").clockpicker("show").clockpicker("toggleView", "minutes");
            }),
            a(".input-daterange-datepicker").daterangepicker({ buttonClasses: ["btn", "btn-sm"], applyClass: "btn-secondary", cancelClass: "btn-primary" }),
            a(".input-daterange-timepicker").daterangepicker({
                timePicker: !0,
                format: "MM/DD/YYYY h:mm A",
                timePickerIncrement: 30,
                timePicker12Hour: !0,
                timePickerSeconds: !1,
                buttonClasses: ["btn", "btn-sm"],
                applyClass: "btn-secondary",
                cancelClass: "btn-primary",
            }),
            a(".input-limit-datepicker").daterangepicker({
                format: "MM/DD/YYYY",
                minDate: "06/01/2016",
                maxDate: "06/30/2016",
                buttonClasses: ["btn", "btn-sm"],
                applyClass: "btn-secondary",
                cancelClass: "btn-primary",
                dateLimit: { days: 6 },
            }),
            a("#reportrange span").html(moment().subtract(29, "days").format("MMMM D, YYYY") + " - " + moment().format("MMMM D, YYYY")),
            a("#reportrange").daterangepicker(
                {
                    format: "MM/DD/YYYY",
                    startDate: moment().subtract(29, "days"),
                    endDate: moment(),
                    minDate: "01/01/2016",
                    maxDate: "12/31/2016",
                    dateLimit: { days: 60 },
                    showDropdowns: !0,
                    showWeekNumbers: !0,
                    timePicker: !1,
                    timePickerIncrement: 1,
                    timePicker12Hour: !0,
                    ranges: {
                        Today: [moment(), moment()],
                        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                        "Last 7 Days": [moment().subtract(6, "days"), moment()],
                        "Last 30 Days": [moment().subtract(29, "days"), moment()],
                        "This Month": [moment().startOf("month"), moment().endOf("month")],
                        "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
                    },
                    opens: "left",
                    drops: "down",
                    buttonClasses: ["btn", "btn-sm"],
                    applyClass: "btn-success",
                    cancelClass: "btn-secondary",
                    separator: " to ",
                    locale: {
                        applyLabel: "Submit",
                        cancelLabel: "Cancel",
                        fromLabel: "From",
                        toLabel: "To",
                        customRangeLabel: "Custom",
                        daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        firstDay: 1,
                    },
                },
                function (t, e, o) {
                    console.log(t.toISOString(), e.toISOString(), o), a("#reportrange span").html(t.format("MMMM D, YYYY") + " - " + e.format("MMMM D, YYYY"));
                }
            );
    }),
        (a.FormPickers = new t()),
        (a.FormPickers.Constructor = t);
})(window.jQuery),
    (function (t) {
        "use strict";
        window.jQuery.FormPickers.init();
    })();
