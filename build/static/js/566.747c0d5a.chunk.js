"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[566],{1566:function(e,n,t){t.r(n),t.d(n,{default:function(){return I}});var r=t(4165),s=t(5861),i=t(1413),o=t(885),c=t(2791),a=t(7361),u=t(2913),l=t(184);var d=function(e){var n,t,d=e.conversation,v=e.currentUser,f=e.isActive,m=e.onSelect,x=(0,c.useState)({}),h=(0,o.Z)(x,2),p=h[0],Z=h[1];return(0,c.useEffect)((function(){var e=d.members.find((function(e){return e!==v.userId}));(0,s.Z)((0,r.Z)().mark((function n(){var t,s;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,u.Z.get("/users",{params:{userId:e}});case 3:t=n.sent,null!==(s=t.data)&&void 0!==s&&s.response&&Z(s.response),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),console.log(n.t0);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()}),[v]),(0,l.jsxs)("div",{onClick:function(){return m((0,i.Z)((0,i.Z)((0,i.Z)({},p),d),{},{userId:null===p||void 0===p?void 0:p._id}))},className:"flex items-center p-2.5 cursor-pointer hover:bg-gray-30 ".concat(f&&"bg-gray-20"),children:[(0,l.jsx)("img",{className:"w-10 h-10 object-cover mr-5 rounded-full",src:(null===p||void 0===p?void 0:p.profilepicture)||a.tU,alt:""}),(0,l.jsxs)("div",{className:"font-medium",children:[(0,l.jsx)("div",{children:null===p||void 0===p?void 0:p.username}),(0,l.jsx)("div",{className:"truncate w-40 text-xs",children:(n=d,t=v._id,null!==n&&void 0!==n&&n.text?(null===n||void 0===n?void 0:n.sender)===t?"You: ".concat(null===n||void 0===n?void 0:n.text):null===n||void 0===n?void 0:n.text:"")})]})]})},v=t(3436),f=t(2982),m=t(8499),x=(0,m.Z)(c.createElement("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}),"ArrowBack"),h=t(1523),p=t(2426),Z=t.n(p),g=(0,m.Z)(c.createElement("path",{d:"M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"}),"DoneAll");function b(e){var n,t=e.message,r=e.own,s=e.showSent,i=(0,c.useState)(!1),a=(0,o.Z)(i,2),u=a[0],d=a[1];return(0,c.useEffect)((function(){s&&t.promise.then((function(e){var n;return null===e||void 0===e||null===(n=e.response)||void 0===n?void 0:n.sent})).then(d)}),[]),(0,l.jsx)("div",{className:"flex flex-col ".concat(r&&"items-end"," mt-2"),children:(0,l.jsx)("div",{className:"max-w-xs flex",children:(0,l.jsxs)("div",{className:"px-2.5 py-1 rounded relative ".concat(r?"bg-blue-10 text-white":"bg-gray-50"),children:[(0,l.jsx)("div",{className:"text-xs",children:(n=null===t||void 0===t?void 0:t.createdAt,(new Date).toLocaleDateString()===new Date(n).toLocaleDateString()?Z()(n).format("hh:mm a"):Z()(n).format("DD-MM-YYYY hh:mm a"))}),(0,l.jsx)("div",{className:"md:text-base text-sm break-all",children:null===t||void 0===t?void 0:t.text}),s&&u&&(0,l.jsx)("div",{className:"text-[14px] absolute text-white bottom-0.5 right-2",children:(0,l.jsx)(g,{fontSize:"inherit"})})]})})})}var w=(0,c.memo)(b),j=t(5867),k=t(4860),N=function(e){var n=e.onSubmit,t=(0,c.useState)(""),r=(0,o.Z)(t,2),s=r[0],i=r[1],a=function(e){e.preventDefault(),n(s),i("")};return(0,l.jsxs)("form",{onSubmit:a,className:"px-4 mb-3 flex gap-3 h-12",children:[(0,l.jsx)("input",{className:"h-full flex-grow outline-1 outline outline-gray-100 rounded-full px-3",placeholder:"Message...",onChange:function(e){return i(e.target.value)},value:s}),(0,l.jsx)("button",{type:"submit",className:"h-full w-20 text-white bg-blue-30 rounded-full grid place-content-center",onClick:a,children:(0,l.jsx)(k.Z,{})})]})};var S=function(e){var n=e.onClose,t=e.currentChat,d=e.user,v=e.receiverId,m=e.incomingMessage,p=e.onSent,Z=e.socket,g=(0,c.useState)(!1),b=(0,o.Z)(g,2),k=b[0],S=b[1],_=(0,c.useState)([]),y=(0,o.Z)(_,2),I=y[0],D=y[1],E=(0,c.useState)({status:!1,lastSeen:0}),C=(0,o.Z)(E,2),L=C[0],M=C[1],z=(0,c.useState)(!0),R=(0,o.Z)(z,2),A=R[0],U=R[1],Y=function(e){var n=(0,c.useRef)();return(0,c.useEffect)((function(){n.current=e})),n.current}(null===t||void 0===t?void 0:t._id),F=(0,c.useRef)(null),O=(0,c.useRef)(null),G=(0,c.useRef)({total:0,page:0,loading:!0,conversationId:null===t||void 0===t?void 0:t._id,receiverId:v}),H=function(e){G.current=(0,i.Z)((0,i.Z)({},G.current),e)};(0,c.useEffect)((function(){window.chatId=null===t||void 0===t?void 0:t._id,H({conversationId:null===t||void 0===t?void 0:t._id,receiverId:v})}),[null===t||void 0===t?void 0:t._id,v]);var B=(0,c.useRef)(0),P=(0,c.useRef)(0),T=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n){var t,s,i,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,q(!0),e.next=4,u.Z.get("/messages/get-messages",{params:n});case 4:return t=e.sent,s=t.data,i=s.data,o=s.total,e.abrupt("return",[i,o]);case 11:e.prev=11,e.t0=e.catch(0),console.error("fetchMessages:- ",e.t0);case 14:return e.prev=14,q(!1),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[0,11,14,17]])})));return function(n){return e.apply(this,arguments)}}();(0,c.useEffect)((function(){(0,s.Z)((0,r.Z)().mark((function e(){var n,s,i,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(Y||"")!==(null===t||void 0===t?void 0:t._id)&&(D([]),P.current=0,B.current=0),e.next=3,T({skip:P.current,limit:30,conversationId:null===t||void 0===t?void 0:t._id});case 3:n=e.sent,s=(0,o.Z)(n,2),i=s[0],c=s[1],B.current=c,D(i);case 9:case"end":return e.stop()}}),e)})))()}),[null===t||void 0===t?void 0:t._id]);var V=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var n,t,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T({skip:P.current,limit:30,conversationId:G.current.conversationId});case 2:n=e.sent,t=(0,o.Z)(n,1),s=t[0],D((function(e){return[].concat((0,f.Z)(e),(0,f.Z)(s))}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=(0,c.useCallback)((function(e){if((0,o.Z)(e,1)[0].isIntersecting&&!G.current.loading){var n=P.current;B.current!==n&&(P.current=n+1,V())}}),[]);(0,c.useEffect)((function(){var e=new IntersectionObserver($,{root:null,rootMargin:"30px",threshold:0});return F.current&&e.observe(F.current),function(){F.current&&e.unobserve(F.current)}}),[$]),(0,c.useEffect)((function(){Object.keys(m).length&&D((function(e){return[(0,i.Z)((0,i.Z)({},m),{},{_id:Date.now(),conversationId:t._id})].concat((0,f.Z)(e))}))}),[m]),(0,c.useEffect)((function(){return Z.connected&&(Z.on("user_disconnect",(function(e){var n=G.current.receiverId,t=e.offline===n;M({status:t,lastSeen:Date.now()}),t&&S(!1)})),Z.on("user_status",(function(e){e.online===G.current.receiverId&&S(!0)}))),function(){null!==Z&&void 0!==Z&&Z.connected&&Z.off("user_disconnect")}}),[Z.connected]);var q=function(e){U(e),H({loading:e})};(0,c.useEffect)((function(){if(null!==t&&void 0!==t&&t._id)return(0,s.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{Z.emit("user_status",{id:v},(function(e){var n=e.response;S(null===n||void 0===n?void 0:n.online)}))}catch(n){console.log(n)}case 1:case"end":return e.stop()}}),e)})))(),function(){return Z.emit("remove_tracker",{id:v},(function(){}))}}),[null===t||void 0===t?void 0:t._id,Z.connected]);var J=function(e){return new Promise((function(n){Z.connected?Z.emit("message",e,n):n({response:{sent:!1}})}))},K=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n){var s,o,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.trim()){e.next=2;break}return e.abrupt("return");case 2:return o={sender:d.userId,text:n,conversationId:t._id,createdAt:Date.now(),receiver:v},p(o),null===(s=O.current)||void 0===s||s.scrollIntoView({behavior:"smooth",block:"start"}),c=J((0,i.Z)((0,i.Z)({},o),{},{profilepicture:null===d||void 0===d?void 0:d.profilepicture,username:null===d||void 0===d?void 0:d.username})),e.prev=6,D((function(e){return[(0,i.Z)((0,i.Z)({},o),{},{_id:Date.now(),promise:c})].concat((0,f.Z)(e))})),e.next=10,u.Z.post("/messages",o);case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(6),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[6,12]])})));return function(n){return e.apply(this,arguments)}}(),Q=function(e,n){var t;return(null===e||void 0===e?void 0:e.sender)===(null===d||void 0===d?void 0:d.userId)&&!(null===e||void 0===e||!e.promise)&&(null===(t=I[n])||void 0===t?void 0:t._id)===(null===e||void 0===e?void 0:e._id)};return(0,l.jsxs)(l.Fragment,{children:[t&&(0,l.jsxs)("div",{className:"flex items-center md:px-5 px-2 py-1.5 bg-gray-20",children:[(0,l.jsx)("button",{className:"px-1.5",children:(0,l.jsx)(x,{onClick:n})}),(0,l.jsxs)(h.rU,{className:"flex gap-4 items-center",to:"/profile/".concat(null===t||void 0===t?void 0:t.username),children:[(0,l.jsx)("img",{className:"w-10 h-10 object-cover rounded-full",src:(null===t||void 0===t?void 0:t.profilepicture)||a.tU,alt:""}),(0,l.jsxs)("div",{className:"font-medium",children:[(0,l.jsx)("div",{className:"md:text-lg font-semibold text-base",children:null===t||void 0===t?void 0:t.username}),(0,l.jsx)("div",{className:"md:text-sm text-xs",children:k?"online":"Last seen ".concat(L.status?j.Z.formatDate(null===L||void 0===L?void 0:L.lastSeen):j.Z.formatDate(null===t||void 0===t?void 0:t.lastSeen))})]})]})]}),A&&(0,l.jsx)("div",{className:"h-10 w-10 absolute top-20 right-0 left-0 mx-auto shadow-md p-1 rounded-full",children:(0,l.jsx)("div",{className:"circle-loader"})}),(0,l.jsxs)("div",{className:"h-full overflow-y-auto px-2.5 my-4 custom-scrollbar flex flex-col-reverse",children:[(0,l.jsx)("div",{ref:O}),I.map((function(e,n){return(0,l.jsx)("div",{className:"px-4",children:(0,l.jsx)(w,{showSent:Q(e,n),message:e,own:e.sender===d.userId})},e._id)})),(0,l.jsx)("div",{ref:F}),(0,l.jsx)("div",{className:"text-center rounded bg-white text-xs text-darkGray-20 border py-2.5 border-gray-120 mx-10",children:"Do not share any personal information in chat because I'm watching you"})]}),(0,l.jsx)(N,{onSubmit:K})]})},_=t(364),y=t(9106);document.title="Social Media | Chat";var I=(0,_.$j)((function(e){return{socket:e.socket.socket,user:e.user}}))((function(e){var n=e.socket,t=e.user,a=(0,c.useState)([]),f=(0,o.Z)(a,2),m=f[0],x=f[1],h=(0,c.useState)(null),p=(0,o.Z)(h,2),Z=p[0],g=p[1],b=(0,c.useState)(!0),w=(0,o.Z)(b,2),j=w[0],k=w[1],N=(0,c.useState)({}),_=(0,o.Z)(N,2),I=_[0],D=_[1],E=(0,c.useRef)(null),C=function(e){var n=e.conversationId,t=e.text,r=e.sender;x((function(e){return e.map((function(e){return n===(null===e||void 0===e?void 0:e._id)?(0,i.Z)((0,i.Z)({},e),{},{text:t,sender:r}):e})).sort((function(e,t){return n===(null===e||void 0===e?void 0:e._id)?-1:n===(null===t||void 0===t?void 0:t._id)?1:0}))}))};(0,c.useEffect)((function(){var e=function(e){var n,t=e.detail;C(t),null!==E&&void 0!==E&&null!==(n=E.current)&&void 0!==n&&n.includes(null===t||void 0===t?void 0:t.sender)&&D(t)};return(0,y.Ld)("message",e),function(){(0,y.r1)("message",e)}}),[]),(0,c.useEffect)((function(){(0,s.Z)((0,r.Z)().mark((function e(){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(!0),e.prev=1,e.next=4,u.Z.get("/conversations/"+t.userId);case 4:n=e.sent,s=n.data,x(s),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:return e.prev=12,k(!1),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[1,9,12,15]])})))()}),[t.userId]);var L=function(e){g(e),E.current=e?null===e||void 0===e?void 0:e.members:[]};return j?(0,l.jsx)(v.Z,{}):m.length?(0,l.jsxs)("div",{className:"flex bg-gray-110 w-full max-w-360 mx-auto",children:[(0,l.jsx)("div",{className:"md:sticky fixed md:block z-10 bg-white overflow-y-auto w-full flex-[3] h-screen-cal-55 custom-scrollbar ".concat(Z?"hidden":"block"),children:(0,l.jsx)("div",{className:"h-full",children:m.map((function(e){return(0,l.jsx)(d,{onSelect:L,isActive:(null===e||void 0===e?void 0:e._id)===(null===Z||void 0===Z?void 0:Z._id),conversation:e,currentUser:t},e._id)}))})}),(0,l.jsx)("div",{className:"sticky w-full flex-[7] h-screen-cal-55",children:(0,l.jsx)("div",{className:"flex flex-col justify-between relative w-full h-full",children:Z?(0,l.jsx)(S,{user:t,socket:n,incomingMessage:I,onSent:C,receiverId:null===Z||void 0===Z?void 0:Z.members.find((function(e){return e!==t.userId})),currentChat:Z,onClose:function(){return L(null)}}):(0,l.jsx)("span",{className:"grid place-content-center h-full text-ft50-60 text-darkGray-20 text-center",children:"Open a conversation to start a chat."})})})]}):(0,l.jsxs)("div",{className:"flex flex-col justify-center mt-32",children:[(0,l.jsx)("div",{className:"m-auto font-semibold text-gray-110 mb-2",children:"No Friends"}),(0,l.jsx)("div",{className:"mx-auto",children:"Follow a Friend To Start Conversation"})]})}))},4860:function(e,n,t){var r=t(2791),s=t(8499);n.Z=(0,s.Z)(r.createElement("path",{d:"M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"}),"Send")}}]);
//# sourceMappingURL=566.747c0d5a.chunk.js.map