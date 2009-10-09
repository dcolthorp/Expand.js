jquery.expand
==============

## Description

Takes a dom element (like a div on the page) and a JSON object and creates a new dom node with the same structure as the JSON object.

## Example

Markup:

    <div style="display: none">
      <ul id="list-example" style="border: solid 1px blue;">
        <li>
          <span class="name">List name</span>
          <ul class="sublist">
            <li>
              <span style="color:red">
                <b class="key">key</b>:
                <span class="value">value</span>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>


Data:

    var data = [
      { name: "parent 1",
        sublist: [
          {key: "a", value: 1},
          {key: "b", value: 2},
          {key: "c", value: 3}
        ]
      },

      { name: "parent 2",
        sublist: [
          {key: "x", value: 4},
          {key: "y", value: 5},
          {key: "z", value: 6}
        ]
      }
    ]


The code:

    $("#list-example").expand(data).appendTo("#output")


The result
<ul  style="border: solid 1px blue;">
  <li>
    <span class="name">parent 1</span>
    <ul class="sublist">
      <li>
        <span style="color:red">
          <b class="key">a</b>:
          <span class="value">1</span>
        </span>
      </li>
      <li>
        <span style="color:red">
          <b class="key">b</b>:
          <span class="value">2</span>
        </span>
      </li>
      <li>
        <span style="color:red">
          <b class="key">c</b>:
          <span class="value">3</span>
        </span>
      </li>
    </ul>
  </li>
  <li>
    <span class="name">parent 2</span>
    <ul class="sublist">
      <li>
        <span style="color:red">
          <b class="key">x</b>:
          <span class="value">4</span>
        </span>
      </li>
      <li>
        <span style="color:red">
          <b class="key">y</b>:
          <span class="value">5</span>
        </span>
      </li>
      <li>
        <span style="color:red">
          <b class="key">z</b>:
          <span class="value">6</span>
        </span>
      </li>
  </ul>
  </li>
</ul>

    <ul style="border: solid 1px blue;">
      <li>
        <span class="name">parent 1</span>
        <ul class="sublist">
          <li>
            <span style="color:red">
              <b class="key">a</b>:
              <span class="value">1</span>
            </span>
          </li>
          <li>
            <span style="color:red">
              <b class="key">b</b>:
              <span class="value">2</span>
            </span>
          </li>
          <li>
            <span style="color:red">
              <b class="key">c</b>:
              <span class="value">3</span>
            </span>
          </li>
        </ul>
      </li>
      <li>
        <span class="name">parent 2</span>
        <ul class="sublist">
          <li>
            <span style="color:red">
              <b class="key">x</b>:
              <span class="value">4</span>
            </span>
          </li>
          <li>
            <span style="color:red">
              <b class="key">y</b>:
              <span class="value">5</span>
            </span>
          </li>
          <li>
            <span style="color:red">
              <b class="key">z</b>:
              <span class="value">6</span>
            </span>
          </li>
        </ul>
      </li>
    </ul>


## Description
* If object is a string, it is set as the innerHTML of the new node
* If object is an object, then for each key
  * if the key starts with a $, the rest of the key is a css selector and the matching element is expanded recursively with the value
  * if the key starts with an @, the rest of the key is assumed to be an attribute name which is set to the value
  * if the key is "innerHTML", the innerHTML of the current element is set to the value (useful for setting attributes together with the text)
  * otherwise the element with the key as a class class is recursively expanded with the value
* if the object is an array, the first child of the dom element is cloned and recursively expanded for each element of the array.