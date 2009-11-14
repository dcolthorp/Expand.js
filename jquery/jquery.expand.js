(function($) {
  var expandTemplateInPlace = function(element, expansion) {
    if (/^(number|string)$/.test(typeof(expansion)) || (expansion instanceof jQuery)) {
      element.html(expansion);

    } else if (expansion.constructor == Array) {
      var childTemplate = element.children()[0];
      var fragment = document.createDocumentFragment();
      for(var i = 0, l=expansion.length; i < l; i++) {
        var matchExpansion = expansion[i];
        fragment.appendChild(
          expandTemplateInPlace(
            $(childTemplate).clone(true), 
            matchExpansion));
      };

      element.html(fragment);

    } else if($.isFunction(expansion)){
      expansion(element)

    } else if (typeof(expansion) == 'object') {
      for (var propertyName in expansion) {
        if (propertyName.charAt(0) == "@") {
          element.attr(propertyName.slice(1, propertyName.length), expansion[propertyName])

        } else if (propertyName == "innerHTML") {
          element.html(expansion[propertyName]);

        } else {
          var pattern = (propertyName.charAt(0) == "$") ?
            propertyName.slice(1, propertyName.length) :
            "." + propertyName;
          var matchExpansion = expansion[propertyName];
          var matches = element.find(pattern);
          matches.each(function(match) {
            expandTemplateInPlace($(matches[match]), matchExpansion);
          });
        }
      };
    }

    return element[0];
  };

  $.fn.expand = function(expansion) {
    var element = $(this[0]).clone(true);
    element.removeAttr('id');
    return $(expandTemplateInPlace(element, expansion));
  };
})(jQuery);
