import {
  AdminService
} from "./chunk-CZXKLA4A.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-NFSWPOPY.js";
import {
  LoadingComponent
} from "./chunk-A35IXTLQ.js";
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
} from "./chunk-WC4CRWHR.js";
import "./chunk-7VTKONPA.js";
import "./chunk-JDEIMQFJ.js";
import "./chunk-MKJAF7VR.js";
import "./chunk-CH3NEX64.js";
import {
  MatIconModule
} from "./chunk-766SFS74.js";
import {
  MatAnchor,
  MatButtonModule,
  RouterLink
} from "./chunk-7NMHCVKZ.js";
import "./chunk-2SZ2QW3D.js";
import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-RP6JOKCW.js";

// src/app/features/admin/user-management/user-management.component.ts
function UserManagementComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function UserManagementComponent_Conditional_7_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "ID");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_Conditional_7_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r1.id);
  }
}
function UserManagementComponent_Conditional_7_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Name");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_Conditional_7_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", u_r2.firstName, " ", u_r2.lastName, "");
  }
}
function UserManagementComponent_Conditional_7_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Email");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_Conditional_7_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r3.email);
  }
}
function UserManagementComponent_Conditional_7_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Phone");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_Conditional_7_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r4.phone || "-");
  }
}
function UserManagementComponent_Conditional_7_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 13);
    \u0275\u0275text(1, "Role");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_Conditional_7_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 14)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const u_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(u_r5.role === "ADMIN" ? "admin-chip" : "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r5.role);
  }
}
function UserManagementComponent_Conditional_7_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 15);
  }
}
function UserManagementComponent_Conditional_7_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 16);
  }
}
function UserManagementComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 3);
    \u0275\u0275elementContainerStart(1, 4);
    \u0275\u0275template(2, UserManagementComponent_Conditional_7_th_2_Template, 2, 0, "th", 5)(3, UserManagementComponent_Conditional_7_td_3_Template, 2, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 7);
    \u0275\u0275template(5, UserManagementComponent_Conditional_7_th_5_Template, 2, 0, "th", 5)(6, UserManagementComponent_Conditional_7_td_6_Template, 2, 2, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 8);
    \u0275\u0275template(8, UserManagementComponent_Conditional_7_th_8_Template, 2, 0, "th", 5)(9, UserManagementComponent_Conditional_7_td_9_Template, 2, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 9);
    \u0275\u0275template(11, UserManagementComponent_Conditional_7_th_11_Template, 2, 0, "th", 5)(12, UserManagementComponent_Conditional_7_td_12_Template, 2, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 10);
    \u0275\u0275template(14, UserManagementComponent_Conditional_7_th_14_Template, 2, 0, "th", 5)(15, UserManagementComponent_Conditional_7_td_15_Template, 3, 3, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(16, UserManagementComponent_Conditional_7_tr_16_Template, 1, 0, "tr", 11)(17, UserManagementComponent_Conditional_7_tr_17_Template, 1, 0, "tr", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r5.users);
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r5.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r5.columns);
  }
}
var UserManagementComponent = class _UserManagementComponent {
  constructor(adminService) {
    this.adminService = adminService;
    this.users = [];
    this.loading = true;
    this.columns = ["id", "name", "email", "phone", "role"];
  }
  ngOnInit() {
    this.adminService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  static {
    this.\u0275fac = function UserManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserManagementComponent)(\u0275\u0275directiveInject(AdminService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserManagementComponent, selectors: [["app-user-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 1, consts: [[1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], ["mat-table", "", 1, "user-table", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "email"], ["matColumnDef", "phone"], ["matColumnDef", "role"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function UserManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "User Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "\u2190 Dashboard");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, UserManagementComponent_Conditional_6_Template, 1, 0, "app-loading")(7, UserManagementComponent_Conditional_7_Template, 18, 3, "table", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.loading ? 6 : 7);
      }
    }, dependencies: [RouterLink, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatIconModule, MatChipsModule, MatChip, LoadingComponent], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.user-table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.admin-chip[_ngcontent-%COMP%] {\n  background: #e8eaf6 !important;\n  color: #283593 !important;\n}\n/*# sourceMappingURL=user-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserManagementComponent, { className: "UserManagementComponent" });
})();
export {
  UserManagementComponent
};
//# sourceMappingURL=chunk-WACXN6NK.js.map
