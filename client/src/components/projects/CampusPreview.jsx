// The original portfolio’s interface concept, preserved as semantic JSX.
export default function CampusPreview() {
  return (
    <div className="campus-board" aria-hidden="true">
      <div className="campus-top">
        <b>
          campusverse<span>● 3 online</span>
        </b>
        <span>THE COMMON ROOM ↗</span>
      </div>
      <div className="room">
        <span className="desk d1" />
        <span className="desk d2" />
        <span className="rug" />
        <span className="plant p1">✳</span>
        <span className="plant p2">✳</span>
        <span className="avatar a1">
          <i />
          <b>You</b>
        </span>
        <span className="avatar a2">
          <i />
          <b>Arya</b>
        </span>
        <span className="avatar a3">
          <i />
          <b>Dev</b>
        </span>
        <span className="chat-bubble">Ideas are better together.</span>
      </div>
      <div className="campus-bottom">
        ⌨ Move. Meet. Make something. <span>↵</span>
      </div>
    </div>
  );
}
