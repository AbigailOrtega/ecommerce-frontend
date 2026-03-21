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
  MatChip,
  MatChipsModule
} from "./chunk-VPRZG4RE.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-YPEJ5GST.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-US5PAJIM.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-WL5UKMCF.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-632HDFWS.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel
} from "./chunk-3KYEYZGS.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-WS62BK7G.js";
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
  MatButton,
  MatButtonModule,
  MatIconButton,
  MatOption
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  DatePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-N3527UH3.js";

// src/app/features/admin/ticket-management/ticket-management.component.ts
function TicketManagementComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 3)(1, "div", 8)(2, "div")(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 9);
    \u0275\u0275text(6, "Pedido ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 10);
    \u0275\u0275listener("click", function TicketManagementComponent_Conditional_6_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selected = null);
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "h3");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 11);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 12)(19, "mat-form-field", 13)(20, "mat-label");
    \u0275\u0275text(21, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-select", 14);
    \u0275\u0275twoWayListener("ngModelChange", function TicketManagementComponent_Conditional_6_Template_mat_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editStatus, $event) || (ctx_r1.editStatus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(23, "mat-option", 15);
    \u0275\u0275text(24, "Abierto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "mat-option", 16);
    \u0275\u0275text(26, "En progreso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-option", 17);
    \u0275\u0275text(28, "Resuelto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "mat-option", 18);
    \u0275\u0275text(30, "Cerrado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "mat-form-field", 19)(32, "mat-label");
    \u0275\u0275text(33, "Notas del admin (visibles al cliente)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "textarea", 20);
    \u0275\u0275twoWayListener("ngModelChange", function TicketManagementComponent_Conditional_6_Template_textarea_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editNotes, $event) || (ctx_r1.editNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "button", 21);
    \u0275\u0275listener("click", function TicketManagementComponent_Conditional_6_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveUpdate());
    });
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Ticket #", ctx_r1.selected.id, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selected.orderNumber);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u2014 ", ctx_r1.selected.userName, " \u2014 ", \u0275\u0275pipeBind2(10, 10, ctx_r1.selected.createdAt, "medium"), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selected.subject);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selected.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editStatus);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editNotes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving ? "Guardando..." : "Guardar", " ");
  }
}
function TicketManagementComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Cargando...");
    \u0275\u0275elementEnd();
  }
}
function TicketManagementComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon", 22);
    \u0275\u0275text(2, "support_agent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Sin tickets a\xFAn.");
    \u0275\u0275elementEnd()();
  }
}
function TicketManagementComponent_Conditional_10_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function TicketManagementComponent_Conditional_10_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3.id);
  }
}
function TicketManagementComponent_Conditional_10_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Pedido");
    \u0275\u0275elementEnd();
  }
}
function TicketManagementComponent_Conditional_10_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4.orderNumber);
  }
}
function TicketManagementComponent_Conditional_10_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Cliente");
    \u0275\u0275elementEnd();
  }
}
function TicketManagementComponent_Conditional_10_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r5.userName);
  }
}
function TicketManagementComponent_Conditional_10_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Asunto");
    \u0275\u0275elementEnd();
  }
}
function TicketManagementComponent_Conditional_10_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r6.subject);
  }
}
function TicketManagementComponent_Conditional_10_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function TicketManagementComponent_Conditional_10_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("status-" + t_r7.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r7.status);
  }
}
function TicketManagementComponent_Conditional_10_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Fecha");
    \u0275\u0275elementEnd();
  }
}
function TicketManagementComponent_Conditional_10_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, t_r8.createdAt, "mediumDate"));
  }
}
function TicketManagementComponent_Conditional_10_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 35);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function TicketManagementComponent_Conditional_10_td_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 36)(1, "button", 38);
    \u0275\u0275listener("click", function TicketManagementComponent_Conditional_10_td_21_Template_button_click_1_listener() {
      const t_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openDetail(t_r10));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "open_in_new");
    \u0275\u0275elementEnd()()();
  }
}
function TicketManagementComponent_Conditional_10_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 39);
  }
}
function TicketManagementComponent_Conditional_10_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 40);
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected-row", (ctx_r1.selected == null ? null : ctx_r1.selected.id) === row_r11.id);
  }
}
function TicketManagementComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 7);
    \u0275\u0275elementContainerStart(1, 23);
    \u0275\u0275template(2, TicketManagementComponent_Conditional_10_th_2_Template, 2, 0, "th", 24)(3, TicketManagementComponent_Conditional_10_td_3_Template, 2, 1, "td", 25);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 26);
    \u0275\u0275template(5, TicketManagementComponent_Conditional_10_th_5_Template, 2, 0, "th", 24)(6, TicketManagementComponent_Conditional_10_td_6_Template, 2, 1, "td", 25);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 27);
    \u0275\u0275template(8, TicketManagementComponent_Conditional_10_th_8_Template, 2, 0, "th", 24)(9, TicketManagementComponent_Conditional_10_td_9_Template, 2, 1, "td", 25);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 28);
    \u0275\u0275template(11, TicketManagementComponent_Conditional_10_th_11_Template, 2, 0, "th", 24)(12, TicketManagementComponent_Conditional_10_td_12_Template, 2, 1, "td", 29);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 30);
    \u0275\u0275template(14, TicketManagementComponent_Conditional_10_th_14_Template, 2, 0, "th", 24)(15, TicketManagementComponent_Conditional_10_td_15_Template, 3, 3, "td", 25);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 31);
    \u0275\u0275template(17, TicketManagementComponent_Conditional_10_th_17_Template, 2, 0, "th", 24)(18, TicketManagementComponent_Conditional_10_td_18_Template, 3, 4, "td", 25);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 32);
    \u0275\u0275template(20, TicketManagementComponent_Conditional_10_th_20_Template, 2, 0, "th", 24)(21, TicketManagementComponent_Conditional_10_td_21_Template, 4, 0, "td", 25);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(22, TicketManagementComponent_Conditional_10_tr_22_Template, 1, 0, "tr", 33)(23, TicketManagementComponent_Conditional_10_tr_23_Template, 1, 2, "tr", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r1.tickets);
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
var TicketManagementComponent = class _TicketManagementComponent {
  constructor(admin, snackBar) {
    this.admin = admin;
    this.snackBar = snackBar;
    this.tickets = [];
    this.loading = true;
    this.saving = false;
    this.selected = null;
    this.editStatus = "OPEN";
    this.editNotes = "";
    this.displayedColumns = ["id", "order", "customer", "subject", "status", "date", "actions"];
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.admin.getAllTickets().subscribe({
      next: (res) => {
        this.tickets = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  openDetail(t) {
    this.selected = t;
    this.editStatus = t.status;
    this.editNotes = t.adminNotes ?? "";
  }
  saveUpdate() {
    if (!this.selected)
      return;
    this.saving = true;
    const req = { status: this.editStatus, adminNotes: this.editNotes };
    this.admin.updateTicket(this.selected.id, req).subscribe({
      next: (res) => {
        const idx = this.tickets.findIndex((t) => t.id === res.data.id);
        if (idx !== -1)
          this.tickets[idx] = res.data;
        this.selected = res.data;
        this.saving = false;
        this.snackBar.open("Ticket actualizado", "Cerrar", { duration: 2e3 });
      },
      error: () => {
        this.saving = false;
        this.snackBar.open("Error al actualizar el ticket", "Cerrar", { duration: 2e3 });
      }
    });
  }
  static {
    this.\u0275fac = function TicketManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TicketManagementComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TicketManagementComponent, selectors: [["app-ticket-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 2, consts: [[1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], [1, "detail-card"], [1, "table-card"], [1, "empty"], [1, "empty-state"], ["mat-table", "", 1, "full-width", 3, "dataSource"], [1, "detail-header"], [1, "meta"], ["mat-icon-button", "", "matTooltip", "Cerrar", 3, "click"], [1, "description"], [1, "update-row"], ["appearance", "outline"], [3, "ngModelChange", "ngModel"], ["value", "OPEN"], ["value", "IN_PROGRESS"], ["value", "RESOLVED"], ["value", "CLOSED"], ["appearance", "outline", 1, "notes-field"], ["matInput", "", "rows", "2", 3, "ngModelChange", "ngModel"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "empty-icon"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "order"], ["matColumnDef", "customer"], ["matColumnDef", "subject"], ["mat-cell", "", "class", "subject-cell", 4, "matCellDef"], ["matColumnDef", "status"], ["matColumnDef", "date"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "selected-row", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-cell", "", 1, "subject-cell"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Gestionar ticket", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function TicketManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Tickets de Soporte");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, TicketManagementComponent_Conditional_6_Template, 37, 13, "mat-card", 3);
        \u0275\u0275elementStart(7, "mat-card", 4);
        \u0275\u0275template(8, TicketManagementComponent_Conditional_8_Template, 2, 0, "p", 5)(9, TicketManagementComponent_Conditional_9_Template, 5, 0, "div", 6)(10, TicketManagementComponent_Conditional_10_Template, 24, 3, "table", 7);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.selected ? 6 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.loading ? 8 : ctx.tickets.length === 0 ? 9 : 10);
      }
    }, dependencies: [RouterLink, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatCardModule, MatCard, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatChipsModule, MatChip, MatSnackBarModule, MatTooltipModule, MatTooltip, DatePipe], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.detail-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  margin-bottom: 24px;\n  border-left: 4px solid var(--theme-primary);\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.meta[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  margin: 4px 0 0;\n}\n.description[_ngcontent-%COMP%] {\n  color: #444;\n  margin: 8px 0 16px;\n  white-space: pre-line;\n}\n.update-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.notes-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.table-card[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.subject-cell[_ngcontent-%COMP%] {\n  max-width: 260px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #888;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #ccc;\n  display: block;\n  margin: 0 auto 12px;\n}\n.selected-row[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.06);\n}\n.status-open[_ngcontent-%COMP%] {\n  background: #fff3e0 !important;\n  color: #e65100 !important;\n}\n.status-in_progress[_ngcontent-%COMP%] {\n  background: #e3f2fd !important;\n  color: #1565c0 !important;\n}\n.status-resolved[_ngcontent-%COMP%] {\n  background: #e8f5e9 !important;\n  color: #2e7d32 !important;\n}\n.status-closed[_ngcontent-%COMP%] {\n  background: #f5f5f5 !important;\n  color: #757575 !important;\n}\n/*# sourceMappingURL=ticket-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TicketManagementComponent, { className: "TicketManagementComponent" });
})();
export {
  TicketManagementComponent
};
//# sourceMappingURL=chunk-7MMFPZ32.js.map
