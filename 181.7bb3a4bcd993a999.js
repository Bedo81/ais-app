"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[181],{1181:(F,u,l)=>{l.r(u),l.d(u,{Tab1Page:()=>f});var o=l(6380),e=l(4438),i=l(4341),m=l(177);function c(a,s){if(1&a&&(e.j41(0,"ion-select-option",6),e.EFF(1),e.k0s()),2&a){const r=s.$implicit;e.Y8G("value",r.value),e.R7$(),e.SpI(" ",r.label," ")}}let h=(()=>{var a;class s{constructor(t){this.fb=t,this.formSubmitted=new e.bkB,this.countries=[{value:"",label:"Select a country"},{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"}]}ngOnInit(){var t,n;this.searchForm=this.fb.group({searchText:[(null===(t=this.initialValues)||void 0===t?void 0:t.searchText)||"",i.k0.required],country:[(null===(n=this.initialValues)||void 0===n?void 0:n.country)||"",i.k0.required]})}onSubmit(){this.formSubmitted.emit(this.searchForm.value)}}return(a=s).\u0275fac=function(t){return new(t||a)(e.rXU(i.ok))},a.\u0275cmp=e.VBU({type:a,selectors:[["app-search-form"]],inputs:{initialValues:"initialValues"},outputs:{formSubmitted:"formSubmitted"},standalone:!0,features:[e.aNF],decls:12,vars:3,consts:[[3,"ngSubmit","formGroup"],["position","floating"],["formControlName","searchText","type","text","clearInput",""],["formControlName","country"],[3,"value",4,"ngFor","ngForOf"],["expand","full","type","submit",3,"disabled"],[3,"value"]],template:function(t,n){1&t&&(e.j41(0,"form",0),e.bIt("ngSubmit",function(){return n.onSubmit()}),e.j41(1,"ion-item")(2,"ion-label",1),e.EFF(3,"Search"),e.k0s(),e.nrm(4,"ion-input",2),e.k0s(),e.j41(5,"ion-item")(6,"ion-label"),e.EFF(7,"Country"),e.k0s(),e.j41(8,"ion-select",3),e.DNE(9,c,2,2,"ion-select-option",4),e.k0s()(),e.j41(10,"ion-button",5),e.EFF(11,"Search"),e.k0s()()),2&t&&(e.Y8G("formGroup",n.searchForm),e.R7$(9),e.Y8G("ngForOf",n.countries),e.R7$(),e.Y8G("disabled",!n.searchForm.valid))},dependencies:[o.uz,o.he,o.$w,o.Nm,o.Ip,o.Jm,i.X1,i.qT,i.BC,i.cb,i.j4,i.JD,m.MD,m.Sq]}),s})();var p=l(70);let f=(()=>{var a;class s{constructor(t){this.route=t,this.initialValues={},this.initializeFormValues()}initializeFormValues(){this.route.queryParams.subscribe(t=>{this.initialValues={searchText:t.searchText||"",country:t.country||""},console.log("Initial Values:",this.initialValues)})}handleFormValues(t){console.log("Form values:",t)}}return(a=s).\u0275fac=function(t){return new(t||a)(e.rXU(p.nX))},a.\u0275cmp=e.VBU({type:a,selectors:[["app-tab1"]],standalone:!0,features:[e.aNF],decls:6,vars:3,consts:[[3,"translucent"],[3,"fullscreen"],[3,"formSubmitted","initialValues"]],template:function(t,n){1&t&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3," Tab 01 "),e.k0s()()(),e.j41(4,"ion-content",1)(5,"app-search-form",2),e.bIt("formSubmitted",function(b){return n.handleFormValues(b)}),e.k0s()()),2&t&&(e.Y8G("translucent",!0),e.R7$(4),e.Y8G("fullscreen",!0),e.R7$(),e.Y8G("initialValues",n.initialValues))},dependencies:[o.eU,o.ai,o.BC,o.W9,h]}),s})()}}]);