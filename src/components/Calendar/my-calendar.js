import { html } from '@polymer/lit-element';
import { PageViewElement } from '../page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../shared-styles.js';

class MyCalendar extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Calendrier des rencontres!</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
          <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        </head>
        <body>
          <div class="columns is-centered">
            <div class="column is-11">
              <div class="box">
                <p class="title">Calendrier des rencontres</p>
                <div class="columns is-multiline">
                <dom-repeat items="[[event]]">
                  <template>
                    <div class="column is-narrow">
                      <div class="box">
                        <event-list-item
                          name="[[item.name]]"
                          date="[[item.date]]">
                        </event-list-item>
                      </div>
                    </div>
                  </template>
                </dom-repeat>
              <div class="column is-narrow">
                <div class="add_evenement">
                  <img @click= "${this._appear}" src="images/plus.png" alt="Plus" title="Rajouter un évènement" height="50" width="50"/>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <section>
        </section>

        ${this._showRegisterEvent ? html `
          <section>
            <div class="field">
              <label class="label">Nom de l'événement</label>
              <div class="control">
                <input class="input" type="text" placeholder="Text input" id="name">
              </div>
            </div>
            <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" id="date">
            </div>
          </div>

            <div class="field">
              <label class="label">Lieu</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input is-success" type="text" placeholder="Text input" id="lieu">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Type</label>
              <div class="control">
                <div class="select">
                  <select name="number">
                    <option value="0">Non défini</option>
                    <option value="1">1 vs 1</option>
                    <option value="2">2 vs 2</option>
                    <option value="3">3 vs 3</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Informations supplementaires</label>
              <div class="control">
                <textarea class="textarea" placeholder="Textarea" id="description"></textarea>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button @click="${this._postEvent}" class="button is-link" id="submit">Submit</button>
              </div>
              <div class="control">
                <button @click="${this._appear}" class="button is-text">Cancel</button>
              </div>
            </div>
          </section>
        ` : ``}
        </body>
      </html>

    `;
  }
  static get properties() {
    return {
      _showRegisterEvent : {
        type: Boolean,
        value : false
      },
      events : {
        type : Array
      }

  }}

  async _getData() {
    try {
      const url = `http://localhost:3000/events`;
      const response = await fetch(url);
      this.events = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  async _postEvent() {
    var i,n,da,de,li;
    console.log("click");
    i=$("#id").val();
    n=$("#name").val();
    da=$("#date").val();
    de=$("#description").val();
    li==$("#lieu").val();

    
    $.post("http://localhost:3000/calendar",{id : i, name : n, date : da, description : de, lieu : li}, function(data){
      if(data==='done')
      {
        alert("event created successfully");
      }
    });
  }

  constructor() {
    super();
    this.events = [];

    this._getData();
  }

  _appear(){
    this._showRegisterEvent = !this._showRegisterEvent;
    // console.log(this._showRegisterEvent);
    return this._showRegisterEvent;
  }

}

window.customElements.define('my-calendar', MyCalendar);
