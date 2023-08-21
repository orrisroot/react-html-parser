/**
 * List of event attributes
 * These attributes should omit from React attribute
 * @type {EventAttribute[]}
 */
const EventAttributes = [
  'onabort', //
  'onaddsourcebuffer',
  'onaddtrack',
  'onafterprint',
  'onanimationcancel',
  'onanimationend',
  'onanimationiteration',
  'onanimationstart',
  'onaudioprocess',
  'onauxclick',
  'onbeforeprint',
  'onbeforeunload',
  'onblocked',
  'onblur',
  'onboundary',
  'onbufferedamountlow',
  'oncancel',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'onclose',
  'oncomplete',
  'onconnect',
  'onconnecting',
  'onconnectionstatechange',
  'oncontextmenu',
  'oncontrollerchange',
  'oncopy',
  'oncuechange',
  'oncut',
  'ondataavailable',
  'ondatachannel',
  'ondblclick',
  'ondevicechange',
  'ondevicemotion',
  'ondeviceorientation',
  'ondisconnect',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onencrypted',
  'onend',
  'onended',
  'onenter',
  'onenterpictureinpicture',
  'onerror',
  'onexit',
  'onfinish',
  'onfocus',
  'onformdata',
  'onfullscreenchange',
  'onfullscreenerror',
  'ongamepadconnected',
  'ongamepaddisconnected',
  'ongotpointercapture',
  'onhashchange',
  'onicecandidate',
  'oniceconnectionstatechange',
  'onicegatheringstatechange',
  'oninput',
  'oninvalid',
  'onkeydown',
  'onkeypress',
  'onkeystatuseschange',
  'onkeyup',
  'onlanguagechange',
  'onleavepictureinpicture',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadend',
  'onloading',
  'onloadingdone',
  'onloadingerror',
  'onloadstart',
  'onlostpointercapture',
  'onmark',
  'onmessage',
  'onmessageerror',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmute',
  'onnegotiationneeded',
  'onoffline',
  'ononline',
  'onopen',
  'onorientationchange',
  'onpagehide',
  'onpageshow',
  'onpaste',
  'onpause',
  'onpaymentmethodchange',
  'onplay',
  'onplaying',
  'onpointercancel',
  'onpointerdown',
  'onpointerenter',
  'onpointerleave',
  'onpointerlockchange',
  'onpointerlockerror',
  'onpointermove',
  'onpointerout',
  'onpointerover',
  'onpointerup',
  'onpopstate',
  'onprocessorerror',
  'onprogress',
  'onratechange',
  'onreadystatechange',
  'onrejectionhandled',
  'onremove',
  'onremovesourcebuffer',
  'onremovetrack',
  'onreset',
  'onresize',
  'onresourcetimingbufferfull',
  'onresume',
  'onscroll',
  'onseeked',
  'onseeking',
  'onselect',
  'onselectionchange',
  'onselectstart',
  'onshow',
  'onsignalingstatechange',
  'onsourceclose',
  'onsourceended',
  'onsourceopen',
  'onstalled',
  'onstart',
  'onstatechange',
  'onstop',
  'onstorage',
  'onsubmit',
  'onsuccess',
  'onsuspend',
  'ontimeout',
  'ontimeupdate',
  'ontoggle',
  'ontonechange',
  'ontouchcancel',
  'ontouchend',
  'ontouchmove',
  'ontouchstart',
  'ontrack',
  'ontransitioncancel',
  'ontransitionend',
  'ontransitionrun',
  'ontransitionstart',
  'onunhandledrejection',
  'onunload',
  'onunmute',
  'onupdate',
  'onupdateend',
  'onupdatefound',
  'onupdatestart',
  'onupgradeneeded',
  'onversionchange',
  'onvisibilitychange',
  'onvoiceschanged',
  'onvolumechange',
  'onwaiting',
  'onwaitingforkey',
  'onwebkitanimationend',
  'onwebkitanimationiteration',
  'onwebkitanimationstart',
  'onwebkittransitionend',
  'onwheel',
] as const;

export type EventAttribute = (typeof EventAttributes)[number];
export default EventAttributes;
