import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

export class TeamDetail extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .team {
          margin: 10px;
          padding: 10px;
          border: solid 1px black;
          border-radius: 10px;
          min-height: 150px;
        }
        .back {
          width: 50px;
          height: 50px;
        }
        .img {
          float: left;
          border: 1px solid black;
          margin-right: 3em;
          margin-bottom: 2em;
          background-color: white;
          padding: 2em;
          height: 400px;
          width: 400px;
        }
        .ratio {
          clear:both;
        }

        ul.team-thumbs {
          margin: 0;
          list-style: none;
        }

        ul.team-thumbs li {
          border: 1px solid black;
          display: inline-block;
          margin: 1em;
          background-color: white;
        }

        ul.team-thumbs img {
          height: 100px;
          width: 100px;
          padding: 1em;
        }

        ul.specs {
          clear: both;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        ul.specs > li{
          display: inline-block;
          width: 200px;
          vertical-align: top;
        }

        ul.specs > li > span{
          font-weight: bold;
          font-size: 1.2em;
        }

        ul.specs dt {
          font-weight: bold;
        }

        h1 {
          border-bottom: 1px solid gray;
        }
      </style>

      <div id="[[team.id]]" class="team clearfix">
        <a href="/teams"><img class="pull-right back" src="/img/back.png"></a>
        <h1 class="name">[[team.name]]</h1>
        <img class="pull-right img" src="{{mainImg}}">
        <p class="description">[[team.description]]</p>

        <ul class="team-thumbs">
          <li>
            <img src="/data/[[team.img]]" team="[[team.img]]" on-click="setImage">
          </li>
          <li>
            <img src="/data/[[team.label]]" team="[[team.label]]" on-click="setImage">
          </li>
        </ul>
        <ul class="specs">
          <li>
            <dl>
              <dt>Win ratio</dt>
              <dd>[[team.ratio]]%</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Players</dt>
              <template is="dom-repeat" items=[[team.players]] as="playerId">
                <a href="/player/[[playerId]]"><dd>[[playerId]]</dd></a>
              </template>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Contact</dt>
              <dd>[[team.availability]]</dd>
            </dl>
          </li>
        </ul>
      </div>
    `;
  }


  static get properties() {
    return {
      id: {
        type: String,
        observer: '_onIdChange',
      },
      team: {
        type: Object,
      },
      mainImg: {
        type: String,
        value: "",
      },
    };
  }

  setImage(e){
    this.mainImg = e.path[0].src;
  }

  async _onIdChange() {
    console.log(this.id);
    // const url = `/data/teams/details/${this.id}.json`;
    const url = `http://localhost:3000/team/${this.id}`;
    try {
      const response = await fetch(url);
      this.team = await response.json();
      this.mainImg = "/data/"+this.team.img;
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
}


window.customElements.define('team-detail',TeamDetail);
