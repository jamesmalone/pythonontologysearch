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
            url: 'http://localhost:8983/solr/note/select?wt=json&q=%QUERY',
            wildcard: '%QUERY',
            filter: function (data) {
                return $.map(data.response.docs, function (suggestionSet) {
                    return{
                        title_auto : suggestionSet.title_auto,
                        category : suggestionSet.category
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
            display: 'title_auto',

            source: engine.ttAdapter(),
            //source: engine


            templates: {
                empty: [
                    '<div class="empty-message">',
                    ' -No results-',
                    '</div>'
                ].join('\n'),
                suggestion: Handlebars.compile('<p class="Typeahead-input tt-input">{{title_auto}}' +  '  #{{category}}</p>')
            },
            engine: Handlebars
        });


});