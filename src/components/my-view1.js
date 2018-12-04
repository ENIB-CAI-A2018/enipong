/**
@../../node_moduleslicense
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/app-route/app-route';
import '@polymer/app-route/app-location';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import './player/player-list.js';
import './player/player-details.js';

// These are the shared styles needed by this element.

class MyView1 extends PageViewElement {
  render() {
    return html`
    ${SharedStyles}
    <style include="granite-bootstrap"></style>

      <template is="dom-if" if="{{playerListActive}}">
        <player-list></player-list>
      </template>

      <template is="dom-if" if="{{playerIdActive}}">
        <player-detail id="[[playerId.id]]"></player-detail>
      </template>
    `;
  }
  static get properties() {
    return {
      playerListActive: {
        type: Boolean,
      },
      playerIdActive: {
        type: Boolean,
      },
      playerId: {
        tpe: String,
      },
      route: {
        type: Object,
      },
    };
  }
}


window.customElements.define('my-view1', MyView1);
