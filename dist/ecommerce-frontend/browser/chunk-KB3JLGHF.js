import {
  StoreInfoService
} from "./chunk-CBRWNEVA.js";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-WL5UKMCF.js";
import "./chunk-FQ2SHJAF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-R7V3ES2J.js";
import {
  MatButtonModule
} from "./chunk-TPU3W7C5.js";
import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-N3527UH3.js";

// src/app/features/about/about.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AboutComponent_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "img", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", img_r1.url, \u0275\u0275sanitizeUrl)("alt", (ctx_r1.info == null ? null : ctx_r1.info.name) || "Store image");
  }
}
function AboutComponent_Conditional_1_Conditional_4_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275listener("click", function AboutComponent_Conditional_1_Conditional_4_For_6_Template_span_click_0_listener() {
      const \u0275$index_22_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goTo(\u0275$index_22_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_22_r5 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", \u0275$index_22_r5 === ctx_r1.currentIndex);
  }
}
function AboutComponent_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function AboutComponent_Conditional_1_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.prev());
    });
    \u0275\u0275text(1, "\u25C0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 8);
    \u0275\u0275listener("click", function AboutComponent_Conditional_1_Conditional_4_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.next());
    });
    \u0275\u0275text(3, "\u25B6");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9);
    \u0275\u0275repeaterCreate(5, AboutComponent_Conditional_1_Conditional_4_For_6_Template, 1, 2, "span", 10, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.images);
  }
}
function AboutComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 4);
    \u0275\u0275repeaterCreate(2, AboutComponent_Conditional_1_For_3_Template, 2, 2, "div", 5, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AboutComponent_Conditional_1_Conditional_4_Template, 7, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", "translateX(-" + ctx_r1.currentIndex * 100 + "%)");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.images);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.images.length > 1 ? 4 : -1);
  }
}
function AboutComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "mat-icon");
    \u0275\u0275text(2, "store");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Pr\xF3ximamente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Estamos preparando informaci\xF3n sobre nuestra tienda.");
    \u0275\u0275elementEnd()();
  }
}
function AboutComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.info.name);
  }
}
function AboutComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.info.aboutText);
  }
}
function AboutComponent_Conditional_3_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 16)(1, "mat-card-content")(2, "div", 17)(3, "mat-icon", 18);
    \u0275\u0275text(4, "emoji_objects");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "Misi\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.info.mission);
  }
}
function AboutComponent_Conditional_3_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 16)(1, "mat-card-content")(2, "div", 17)(3, "mat-icon", 19);
    \u0275\u0275text(4, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "Visi\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.info.vision);
  }
}
function AboutComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275template(1, AboutComponent_Conditional_3_Conditional_3_Conditional_1_Template, 9, 1, "mat-card", 16)(2, AboutComponent_Conditional_3_Conditional_3_Conditional_2_Template, 9, 1, "mat-card", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.mission ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.vision ? 2 : -1);
  }
}
function AboutComponent_Conditional_3_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "mat-icon");
    \u0275\u0275text(2, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.info.phone);
  }
}
function AboutComponent_Conditional_3_Conditional_4_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 22)(1, "mat-icon");
    \u0275\u0275text(2, "photo_camera");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Instagram ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("href", ctx_r1.info.instagramUrl, \u0275\u0275sanitizeUrl);
  }
}
function AboutComponent_Conditional_3_Conditional_4_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 23)(1, "mat-icon");
    \u0275\u0275text(2, "facebook");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Facebook ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("href", ctx_r1.info.facebookUrl, \u0275\u0275sanitizeUrl);
  }
}
function AboutComponent_Conditional_3_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275template(1, AboutComponent_Conditional_3_Conditional_4_Conditional_2_Conditional_1_Template, 4, 1, "a", 22)(2, AboutComponent_Conditional_3_Conditional_4_Conditional_2_Conditional_2_Template, 4, 1, "a", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.instagramUrl ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.facebookUrl ? 2 : -1);
  }
}
function AboutComponent_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275template(1, AboutComponent_Conditional_3_Conditional_4_Conditional_1_Template, 5, 1, "div", 20)(2, AboutComponent_Conditional_3_Conditional_4_Conditional_2_Template, 3, 2, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.phone ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.instagramUrl || ctx_r1.info.facebookUrl ? 2 : -1);
  }
}
function AboutComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275template(1, AboutComponent_Conditional_3_Conditional_1_Template, 2, 1, "h1", 12)(2, AboutComponent_Conditional_3_Conditional_2_Template, 2, 1, "p", 13)(3, AboutComponent_Conditional_3_Conditional_3_Template, 3, 2, "div", 14)(4, AboutComponent_Conditional_3_Conditional_4_Template, 3, 2, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.name ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.aboutText ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.mission || ctx_r1.info.vision ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.info.phone || ctx_r1.info.instagramUrl || ctx_r1.info.facebookUrl ? 4 : -1);
  }
}
var AboutComponent = class _AboutComponent {
  constructor(storeInfoService) {
    this.storeInfoService = storeInfoService;
    this.info = null;
    this.images = [];
    this.loading = true;
    this.currentIndex = 0;
    this.autoplayTimer = null;
  }
  ngOnInit() {
    this.storeInfoService.getPublic().subscribe({
      next: (res) => {
        this.info = res.data;
        this.images = res.data?.images ?? [];
        this.loading = false;
        if (this.images.length > 1) {
          this.startAutoplay();
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  ngOnDestroy() {
    this.stopAutoplay();
  }
  prev() {
    this.goTo(this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1);
  }
  next() {
    this.goTo((this.currentIndex + 1) % this.images.length);
  }
  goTo(index) {
    this.currentIndex = index;
    this.resetAutoplay();
  }
  startAutoplay() {
    this.autoplayTimer = setInterval(() => this.next(), 5e3);
  }
  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
  resetAutoplay() {
    this.stopAutoplay();
    if (this.images.length > 1) {
      this.startAutoplay();
    }
  }
  static {
    this.\u0275fac = function AboutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AboutComponent)(\u0275\u0275directiveInject(StoreInfoService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AboutComponent, selectors: [["app-about"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 3, consts: [[1, "about-container"], [1, "carousel"], [1, "placeholder"], [1, "content"], [1, "carousel-track"], [1, "carousel-slide"], [3, "src", "alt"], [1, "carousel-btn", "prev", 3, "click"], [1, "carousel-btn", "next", 3, "click"], [1, "carousel-dots"], [1, "dot", 3, "active"], [1, "dot", 3, "click"], [1, "store-name"], [1, "about-text"], [1, "cards-row"], [1, "contact-section"], [1, "info-card"], [1, "card-header"], [1, "card-icon", "mission"], [1, "card-icon", "vision"], [1, "contact-row"], [1, "social-row"], ["target", "_blank", "rel", "noopener", 1, "social-link", "instagram", 3, "href"], ["target", "_blank", "rel", "noopener", 1, "social-link", "facebook", 3, "href"]], template: function AboutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, AboutComponent_Conditional_1_Template, 5, 3, "div", 1)(2, AboutComponent_Conditional_2_Template, 7, 0, "div", 2)(3, AboutComponent_Conditional_3_Template, 5, 4, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.images.length > 0 ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.info && !ctx.loading ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.info ? 3 : -1);
      }
    }, dependencies: [MatCardModule, MatCard, MatCardContent, MatIconModule, MatIcon, MatButtonModule], styles: ["\n\n.about-container[_ngcontent-%COMP%] {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 24px 16px;\n}\n.carousel[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  border-radius: 12px;\n  margin-bottom: 40px;\n  max-height: 480px;\n}\n.carousel-track[_ngcontent-%COMP%] {\n  display: flex;\n  transition: transform 0.5s ease;\n  height: 100%;\n}\n.carousel-slide[_ngcontent-%COMP%] {\n  min-width: 100%;\n}\n.carousel-slide[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 480px;\n  object-fit: cover;\n  display: block;\n}\n.carousel-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(0, 0, 0, 0.45);\n  color: white;\n  border: none;\n  padding: 12px 16px;\n  cursor: pointer;\n  font-size: 1.2rem;\n  border-radius: 4px;\n  transition: background 0.2s;\n}\n.carousel-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.7);\n}\n.carousel-btn.prev[_ngcontent-%COMP%] {\n  left: 12px;\n}\n.carousel-btn.next[_ngcontent-%COMP%] {\n  right: 12px;\n}\n.carousel-dots[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 14px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: 8px;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.55);\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.dot.active[_ngcontent-%COMP%] {\n  background: white;\n}\n.placeholder[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 16px;\n  color: #aaa;\n}\n.placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  margin-bottom: 16px;\n}\n.placeholder[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 1.6rem;\n}\n.content[_ngcontent-%COMP%] {\n}\n.store-name[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  margin-bottom: 16px;\n  color: #212121;\n}\n.about-text[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  line-height: 1.7;\n  color: #555;\n  margin-bottom: 32px;\n}\n.cards-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.info-card[_ngcontent-%COMP%] {\n  padding: 8px;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 8px;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n}\n.card-icon.mission[_ngcontent-%COMP%] {\n  color: #f9a825;\n}\n.card-icon.vision[_ngcontent-%COMP%] {\n  color: #1565c0;\n}\n.info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #555;\n  line-height: 1.6;\n}\n.contact-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-top: 8px;\n}\n.contact-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 1.05rem;\n  color: #333;\n}\n.contact-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.social-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.social-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 18px;\n  border-radius: 24px;\n  font-size: 0.95rem;\n  font-weight: 500;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.social-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.82;\n}\n.social-link[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.social-link.instagram[_ngcontent-%COMP%] {\n  background: #E1306C;\n  color: white;\n}\n.social-link.facebook[_ngcontent-%COMP%] {\n  background: #1877F2;\n  color: white;\n}\n@media (max-width: 600px) {\n  .cards-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .carousel-slide[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    height: 240px;\n  }\n  .carousel[_ngcontent-%COMP%] {\n    max-height: 240px;\n  }\n}\n/*# sourceMappingURL=about.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AboutComponent, { className: "AboutComponent" });
})();
export {
  AboutComponent
};
//# sourceMappingURL=chunk-KB3JLGHF.js.map
