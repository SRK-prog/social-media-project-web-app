"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[87],{6087:function(e,t,s){s.r(t),s.d(t,{default:function(){return f}});var r=s(1413),a=s(4165),n=s(5861),l=s(885),i=s(2791),d=s(1927),o=s(6513),c=s(1523),u=s(9576),m=s(1134),v=s(3402),x=s(2913),h=s(184);function f(){var e,t=(0,m.cI)(),s=t.register,f=t.handleSubmit,p=t.formState.errors,b=(0,i.useState)(""),g=(0,l.Z)(b,2),j=g[0],w=g[1],y=(0,i.useState)(!1),N=(0,l.Z)(y,2),Z=N[0],k=N[1];(0,i.useEffect)((function(){document.title="Forgot Password"}),[]);var S=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(t){var s,r,n,l,i,d,o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.email,k(!0),w(""),e.prev=3,e.next=6,x.Z.post("/reset",{email:s.toLowerCase()});case 6:r=e.sent,null!==(n=r.data)&&void 0!==n&&n.message&&v.ZP.success(n.message,{position:"top-right"}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),w((null===e.t0||void 0===e.t0||null===(l=e.t0.response)||void 0===l||null===(i=l.data)||void 0===i?void 0:i.message)||(null===e.t0||void 0===e.t0||null===(d=e.t0.response)||void 0===d||null===(o=d.data)||void 0===o?void 0:o.error)||"Something went wrong, Please try again");case 14:return e.prev=14,k(!1),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[3,11,14,17]])})));return function(t){return e.apply(this,arguments)}}();return(0,h.jsx)("div",{className:"mt-16",children:(0,h.jsxs)("form",{className:"rounded-lg mx-auto px-3 pt-2.5 pb-4 border border-darkGray-30 max-w-112.5",onSubmit:f(S),children:[(0,h.jsxs)("div",{className:"flex justify-between my-2",children:[(0,h.jsx)("h2",{className:"text-xl text-center font-semibold",children:"Forgot Password"}),(0,h.jsx)(c.rU,{to:"/",children:(0,h.jsx)(u.Z,{})})]}),(0,h.jsx)("div",{className:"mt-4 text-gray-80 text-sm",children:"Enter your email address in the form below and we will send your the recovery link to reset your password"}),(0,h.jsx)("div",{className:"mt-4",children:(0,h.jsx)(d.Z,(0,r.Z)({type:"email",label:"Email",error:!!p.email,helperText:null===p||void 0===p||null===(e=p.email)||void 0===e?void 0:e.message,fullWidth:!0,variant:"outlined"},s("email",{required:"email is required",pattern:{value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message:"Please enter a valid email."}})))}),(0,h.jsx)("div",{className:"mt-5",children:(0,h.jsx)(o.Z,{variant:"contained",fullWidth:!0,className:"h-10",style:{color:"white",backgroundColor:"#3a8fde"},type:"submit",disabled:Z,children:Z?(0,h.jsx)("div",{className:"h-8 w-8",children:(0,h.jsx)("div",{className:"circle-loader"})}):"Send Email"})}),!!j&&(0,h.jsx)("div",{className:"text-red-10 text-sm mb-1.5 mt-2.5 text-center",children:j}),(0,h.jsxs)("div",{className:"text-center text-sm mt-2",children:["Don't have account",(0,h.jsx)(c.rU,{to:"/signup",className:"underline underline-offset-1 ml-1 text-[#4d4dab]",children:"Sign Up"})]})]})})}}}]);
//# sourceMappingURL=87.0c1e31ae.chunk.js.map