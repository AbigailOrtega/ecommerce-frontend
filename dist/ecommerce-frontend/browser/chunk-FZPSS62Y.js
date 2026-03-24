import{aa as i}from"./chunk-6I6S6LHJ.js";var o={azul:{label:"Azul",primary:"#3f51b5",primaryDark:"#303f9f",accent:"#ff4081"},verde:{label:"Verde",primary:"#2e7d32",primaryDark:"#1b5e20",accent:"#69f0ae"},naranja:{label:"Naranja",primary:"#e65100",primaryDark:"#bf360c",accent:"#ffd740"},morado:{label:"Morado",primary:"#6a1b9a",primaryDark:"#4a148c",accent:"#ea80fc"},rosa:{label:"Rosa",primary:"#ad1457",primaryDark:"#880e4f",accent:"#ff80ab"},negro:{label:"Negro",primary:"#212121",primaryDark:"#000000",accent:"#ffd740"},rojo:{label:"Rojo",primary:"#c62828",primaryDark:"#8e0000",accent:"#ffd740"},cian:{label:"Cian",primary:"#00838f",primaryDark:"#005662",accent:"#ff6e40"},azulOscuro:{label:"Azul marino",primary:"#1a237e",primaryDark:"#000051",accent:"#40c4ff"},verde2:{label:"Menta",primary:"#00695c",primaryDark:"#004d40",accent:"#ffd740"},cafe:{label:"Caf\xE9",primary:"#4e342e",primaryDark:"#260e04",accent:"#ffab40"},amarillo:{label:"\xC1mbar",primary:"#f57f17",primaryDark:"#bc5100",accent:"#1de9b6"},grisAzul:{label:"Gris azulado",primary:"#455a64",primaryDark:"#1c313a",accent:"#ff6e40"},limon:{label:"Lima",primary:"#558b2f",primaryDark:"#255d00",accent:"#ff6d00"},salmon:{label:"Salm\xF3n",primary:"#d84315",primaryDark:"#9f0000",accent:"#ffd740"},lavanda:{label:"Lavanda",primary:"#7b1fa2",primaryDark:"#4a0072",accent:"#69f0ae"}},s="azul";var l={roboto:{label:"Roboto",fontFamily:"'Roboto', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"},inter:{label:"Inter",fontFamily:"'Inter', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"},poppins:{label:"Poppins",fontFamily:"'Poppins', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"},montserrat:{label:"Montserrat",fontFamily:"'Montserrat', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"},lato:{label:"Lato",fontFamily:"'Lato', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"},nunito:{label:"Nunito",fontFamily:"'Nunito', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;700&display=swap"},openSans:{label:"Open Sans",fontFamily:"'Open Sans', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"},raleway:{label:"Raleway",fontFamily:"'Raleway', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700&display=swap"},playfair:{label:"Playfair Display",fontFamily:"'Playfair Display', serif",googleUrl:"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap"},merriweather:{label:"Merriweather",fontFamily:"'Merriweather', serif",googleUrl:"https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"},josefin:{label:"Josefin Sans",fontFamily:"'Josefin Sans', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap"},quicksand:{label:"Quicksand",fontFamily:"'Quicksand', sans-serif",googleUrl:"https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap"}},n="roboto";var g=(()=>{class e{constructor(){this.styleEl=null,this.fontLinkEl=null}apply(a,t=null){this.applyTheme(a),this.applyFont(t)}applyTheme(a){let t=a&&o[a]?a:s,r=o[t],p=`
      :root {
        --theme-primary: ${r.primary};
        --theme-primary-dark: ${r.primaryDark};
        --theme-accent: ${r.accent};
      }
      mat-toolbar[color="primary"] {
        background-color: var(--theme-primary) !important;
      }
      .mat-mdc-raised-button.mat-primary,
      .mat-mdc-unelevated-button.mat-primary {
        --mdc-filled-button-container-color: var(--theme-primary) !important;
        --mdc-protected-button-container-color: var(--theme-primary) !important;
      }
      .mat-mdc-fab.mat-primary,
      .mat-mdc-mini-fab.mat-primary {
        --mat-fab-container-color: var(--theme-primary) !important;
      }
      .mat-mdc-icon-button.mat-primary {
        --mat-icon-button-state-layer-color: var(--theme-primary) !important;
      }
      .mat-badge-content {
        background: var(--theme-accent) !important;
      }
      /* Stepper */
      .mat-stepper-horizontal, .mat-stepper-vertical {
        --mat-stepper-header-selected-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-done-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-edit-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-selected-state-label-text-color: var(--theme-primary) !important;
        --mat-stepper-line-color: var(--theme-primary) !important;
      }
    `;this.styleEl||(this.styleEl=document.createElement("style"),this.styleEl.id="app-dynamic-theme",document.head.appendChild(this.styleEl)),this.styleEl.textContent=p}applyFont(a){let t=a&&l[a]?a:n,r=l[t];this.fontLinkEl||(this.fontLinkEl=document.createElement("link"),this.fontLinkEl.id="app-dynamic-font",this.fontLinkEl.rel="stylesheet",document.head.appendChild(this.fontLinkEl)),this.fontLinkEl.href=r.googleUrl,document.body.style.fontFamily=r.fontFamily}static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275prov=i({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{o as a,s as b,l as c,n as d,g as e};
