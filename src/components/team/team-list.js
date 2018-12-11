import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Import template repeater
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

import './team-list-item.js';

export class TeamList extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <div class="teams container">
        <div class="row">
          <div class="col-md-3">
            <!--Sidebar content-->
            <div class="form-group">
              <label for="search">Search</label>
              <input
                  type="text"
                  class="form-control"
                  id="search"
                  placeholder="Enter search"
                  on-input="_inputChange">
              <label for="sort" class="mt-3">Sort by</label>
              <select
                  id="sort"
                  class="form-control"
                  on-change='_sortingChanged'>
                <template is="dom-repeat" items="[[criteria]]">
                  <option
                      value="[[item.name]]">
                    [[item.label]]
                  </option>
                </template>
              </select>
              <label for="descending" class="mt-3">Descending sort</label>
              <input
                  id="descending"
                  type="checkbox"
                  on-change="_descendingChange">
            </div>
          </div>
          <div class="col-md-9">
            <div class="teams">
              <template
                  id="teamList" is="dom-repeat"
                  items="[[teams]]" filter="_teamFilter" sort="_teamSorter">
                <team-list-item
                    id="[[item.id]]"
                    name="[[item.name]]"
                    description="[[item.description]]"
                    img="[[item.img]]"
                    ratio="[[item.ratio]]">
                </team-list-item>
              </template>
            </div>
            <div>Number of teams in list: [[currentTeams]]</div>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      teams: {
        type: Array,
      },
      filterText: {
        type: String,
      },
      currentTeams: {
        type: String,
        computed: '_getCurrentTeams(teams,filterText)',
      },
      criterium: {
        type: String,
      },
      descendingSort: {
        type: Boolean,
      }
    }
  }

  _inputChange() {
    this.filterText = this.$.search.value;
    this.$.teamList.render();
  }

  _sortingChanged() {
    this.criterium = this.$.sort.selectedOptions[0].value;
    this.$.teamList.render();
  }

  _descendingChange() {
    this.descendingSort = this.$.descending.checked;
    this.$.teamList.render();
  }

  _teamFilter(item) {
      return item.name.match(new RegExp(this.filterText, 'i'));
  }

  _teamSorter(a, b) {
    var invert = 1;
    if (this.descendingSort) invert = -1;
    if ( a[this.criterium] === b[this.criterium] ) return 0;
    if ( a[this.criterium] < b[this.criterium] ) return -1*invert;
    if ( a[this.criterium] > b[this.criterium] ) return 1*invert;
  }

  _getCurrentTeams() {
    return this.teams.filter((item) => item.name.match(new RegExp(this.filterText, 'i'))).length;
  }

  async _getData() {
    try {
      const url = `http://localhost:3000/teams`;
      const response = await fetch(url);
      this.teams = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  constructor() {
    super();
    this.teams = [];

    this.criteria = [
      { name: "name", label: "Alphabetical"},
      { name: "ratio", label: "Win Ratio" }
    ];

    this.criterium = this.criteria[0].name;

    this._getData();
  }
}

window.customElements.define('team-list',TeamList);
