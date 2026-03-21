import {
  AdminService
} from "./chunk-DPPNASQT.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-3YZFWUW6.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-JITF7FU4.js";
import {
  MatChipsModule
} from "./chunk-VPRZG4RE.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-WL5UKMCF.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-632HDFWS.js";
import "./chunk-3KYEYZGS.js";
import "./chunk-WS62BK7G.js";
import "./chunk-W6S7N6HL.js";
import "./chunk-VTPZX5UP.js";
import "./chunk-J25CCJ4O.js";
import "./chunk-SAONJULU.js";
import "./chunk-FQ2SHJAF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-R7V3ES2J.js";
import {
  RouterLink
} from "./chunk-ZS3NQH2Z.js";
import {
  MatAnchor,
  MatButtonModule,
  MatIconButton
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  DatePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-N3527UH3.js";

// src/app/features/admin/review-management/review-management.component.ts
function ReviewManagementComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Cargando...");
    \u0275\u0275elementEnd();
  }
}
function ReviewManagementComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon", 8);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Sin rese\xF1as pendientes. \xA1Todo al d\xEDa!");
    \u0275\u0275elementEnd()();
  }
}
function ReviewManagementComponent_Conditional_11_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Producto");
    \u0275\u0275elementEnd();
  }
}
function ReviewManagementComponent_Conditional_11_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r1.productName);
  }
}
function ReviewManagementComponent_Conditional_11_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Cliente");
    \u0275\u0275elementEnd();
  }
}
function ReviewManagementComponent_Conditional_11_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r2.userName);
  }
}
function ReviewManagementComponent_Conditional_11_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Calificaci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function ReviewManagementComponent_Conditional_11_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.starsFor(r_r3.rating));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", r_r3.rating, "/5)");
  }
}
function ReviewManagementComponent_Conditional_11_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "T\xEDtulo");
    \u0275\u0275elementEnd();
  }
}
function ReviewManagementComponent_Conditional_11_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r5.title);
  }
}
function ReviewManagementComponent_Conditional_11_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Comentario");
    \u0275\u0275elementEnd();
  }
}
function ReviewManagementComponent_Conditional_11_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r6.comment);
  }
}
function ReviewManagementComponent_Conditional_11_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Fecha");
    \u0275\u0275elementEnd();
  }
}
function ReviewManagementComponent_Conditional_11_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 22);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, r_r7.createdAt, "mediumDate"));
  }
}
function ReviewManagementComponent_Conditional_11_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 21);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function ReviewManagementComponent_Conditional_11_td_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 22)(1, "button", 26);
    \u0275\u0275listener("click", function ReviewManagementComponent_Conditional_11_td_21_Template_button_click_1_listener() {
      const r_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.approve(r_r9));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "check_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 27);
    \u0275\u0275listener("click", function ReviewManagementComponent_Conditional_11_td_21_Template_button_click_4_listener() {
      const r_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.reject(r_r9));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "cancel");
    \u0275\u0275elementEnd()()();
  }
}
function ReviewManagementComponent_Conditional_11_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 28);
  }
}
function ReviewManagementComponent_Conditional_11_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 29);
  }
}
function ReviewManagementComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 7);
    \u0275\u0275elementContainerStart(1, 9);
    \u0275\u0275template(2, ReviewManagementComponent_Conditional_11_th_2_Template, 2, 0, "th", 10)(3, ReviewManagementComponent_Conditional_11_td_3_Template, 2, 1, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 12);
    \u0275\u0275template(5, ReviewManagementComponent_Conditional_11_th_5_Template, 2, 0, "th", 10)(6, ReviewManagementComponent_Conditional_11_td_6_Template, 2, 1, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 13);
    \u0275\u0275template(8, ReviewManagementComponent_Conditional_11_th_8_Template, 2, 0, "th", 10)(9, ReviewManagementComponent_Conditional_11_td_9_Template, 5, 2, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 14);
    \u0275\u0275template(11, ReviewManagementComponent_Conditional_11_th_11_Template, 2, 0, "th", 10)(12, ReviewManagementComponent_Conditional_11_td_12_Template, 3, 1, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 15);
    \u0275\u0275template(14, ReviewManagementComponent_Conditional_11_th_14_Template, 2, 0, "th", 10)(15, ReviewManagementComponent_Conditional_11_td_15_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 17);
    \u0275\u0275template(17, ReviewManagementComponent_Conditional_11_th_17_Template, 2, 0, "th", 10)(18, ReviewManagementComponent_Conditional_11_td_18_Template, 3, 4, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 18);
    \u0275\u0275template(20, ReviewManagementComponent_Conditional_11_th_20_Template, 2, 0, "th", 10)(21, ReviewManagementComponent_Conditional_11_td_21_Template, 7, 0, "td", 11);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(22, ReviewManagementComponent_Conditional_11_tr_22_Template, 1, 0, "tr", 19)(23, ReviewManagementComponent_Conditional_11_tr_23_Template, 1, 0, "tr", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r3.reviews);
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r3.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r3.displayedColumns);
  }
}
var ReviewManagementComponent = class _ReviewManagementComponent {
  constructor(admin, snackBar) {
    this.admin = admin;
    this.snackBar = snackBar;
    this.reviews = [];
    this.loading = true;
    this.displayedColumns = ["product", "user", "rating", "title", "comment", "date", "actions"];
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.admin.getPendingReviews().subscribe({
      next: (res) => {
        this.reviews = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  approve(r) {
    this.admin.approveReview(r.id).subscribe({
      next: () => {
        this.reviews = this.reviews.filter((x) => x.id !== r.id);
        this.snackBar.open("Rese\xF1a aprobada y publicada", "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al aprobar la rese\xF1a", "Cerrar", { duration: 2e3 })
    });
  }
  reject(r) {
    if (!confirm(`\xBFEliminar rese\xF1a de "${r.userName}"?`))
      return;
    this.admin.deleteReview(r.id).subscribe({
      next: () => {
        this.reviews = this.reviews.filter((x) => x.id !== r.id);
        this.snackBar.open("Rese\xF1a rechazada y eliminada", "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al eliminar la rese\xF1a", "Cerrar", { duration: 2e3 })
    });
  }
  starsFor(rating) {
    return "\u2605".repeat(rating) + "\u2606".repeat(5 - rating);
  }
  static {
    this.\u0275fac = function ReviewManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReviewManagementComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReviewManagementComponent, selectors: [["app-review-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 1, consts: [[1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], [1, "subtitle"], [1, "table-card"], [1, "empty"], [1, "empty-state"], ["mat-table", "", 1, "full-width", 3, "dataSource"], [1, "empty-icon"], ["matColumnDef", "product"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "user"], ["matColumnDef", "rating"], ["matColumnDef", "title"], ["matColumnDef", "comment"], ["mat-cell", "", "class", "comment-cell", 4, "matCellDef"], ["matColumnDef", "date"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "stars"], [1, "rating-num"], ["mat-cell", "", 1, "comment-cell"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Aprobar y publicar", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Rechazar y eliminar", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function ReviewManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Moderaci\xF3n de Rese\xF1as");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "p", 3);
        \u0275\u0275text(7, "Rese\xF1as pendientes de aprobaci\xF3n antes de mostrarse a los clientes.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "mat-card", 4);
        \u0275\u0275template(9, ReviewManagementComponent_Conditional_9_Template, 2, 0, "p", 5)(10, ReviewManagementComponent_Conditional_10_Template, 5, 0, "div", 6)(11, ReviewManagementComponent_Conditional_11_Template, 24, 3, "table", 7);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275conditional(ctx.loading ? 9 : ctx.reviews.length === 0 ? 10 : 11);
      }
    }, dependencies: [RouterLink, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatIconButton, MatIconModule, MatIcon, MatCardModule, MatCard, MatSnackBarModule, MatTooltipModule, MatTooltip, MatChipsModule, DatePipe], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  margin: -8px 0 24px;\n}\n.table-card[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.comment-cell[_ngcontent-%COMP%] {\n  max-width: 300px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.stars[_ngcontent-%COMP%] {\n  color: #f59e0b;\n  letter-spacing: 2px;\n}\n.rating-num[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 0.8rem;\n  margin-left: 4px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #888;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #4caf50;\n  display: block;\n  margin: 0 auto 12px;\n}\n/*# sourceMappingURL=review-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReviewManagementComponent, { className: "ReviewManagementComponent" });
})();
export {
  ReviewManagementComponent
};
//# sourceMappingURL=chunk-GHOVALTM.js.map
