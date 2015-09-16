/**
 * Created by malone on 15/09/15.
 */

/**
 * Note change the url of the solr server to point to the approriate service
 */

$(document).ready( function() {

    // constructs the suggestion engine
    var engine = new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.title);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: 'http://localhost:8983/solr/ontology_index/select?wt=json&q=%QUERY',
            wildcard: '%QUERY',
            filter: function (data) {
                return $.map(data.response.docs, function (suggestionSet) {
                    return{
                        label : suggestionSet.label,
                        ontology_name : suggestionSet.ontology_name,
                        short_form : suggestionSet.short_form
                    }
                });
            }
        }

    });

    engine.initialize();

    $('#id_q').typeahead({
            hint: true,
            highlight: true,
            minLength: 1,
        },
        {
            name: 'engine',
            display: 'label',

            source: engine.ttAdapter(),
            //source: engine


            templates: {
                empty: [
                    '<div class="empty-message">',
                    ' -No results-',
                    '</div>'
                ].join('\n'),
                suggestion: Handlebars.compile('<p class="Typeahead-input tt-input">{{label}}' +  '  {{short_form}}   #{{ontology_name}}</p>')
            },
            engine: Handlebars
        });


});