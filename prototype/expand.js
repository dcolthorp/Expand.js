var expandTemplateInPlace = function(element, expansion) {
  if (Object.isNumber(expansion) || Object.isString(expansion)) {
    element.innerHTML = expansion;

  } else if (Object.isElement(expansion)) {
    element.innerHTML = "";
    element.insert(expansion);

  } else if (Object.isArray(expansion)) {
    var childTemplate = element.childElements()[0];
    var fragment = document.createDocumentFragment();
    expansion.each(function(matchExpansion) {
      fragment.appendChild(
        expandTemplateInPlace(
          childTemplate.cloneNode(true), 
          matchExpansion));
    });

    element.innerHTML = "";
    element.appendChild(fragment);

  } else if(Object.isFunction(expansion)){
    expansion(element)

  } else if (typeof(expansion) == 'object') {
    for(var propertyName in expansion) {
      if (propertyName.slice(0,1) == "@") {
        element.writeAttribute(propertyName.slice(1, propertyName.length), expansion[propertyName])
        
      } else if (propertyName == "innerHTML") {
        element.innerHTML = expansion[propertyName];
        
      } else {
        var pattern = (propertyName[0] == "$") ?
          propertyName.slice(1, propertyName.length) :
          "." + propertyName;
        var matchExpansion = expansion[propertyName];
        var matches = element.select(pattern);
        matches.each(function(match) {
          expandTemplateInPlace(match, matchExpansion);
        });
      }
    }
  }
  
  return element;
}

var expandTemplate = function(idOrElement, expansion) {
  var element = $($(idOrElement).cloneNode(true));
  element.removeAttribute('id');
  return expandTemplateInPlace(element, expansion);
}
