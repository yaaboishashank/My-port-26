// The original portfolio’s interface concept, preserved as semantic JSX.
export default function HyperClipPreview() {
  return (
    <div className="video-app" aria-hidden="true">
      <div className="app-bar">
        <b>
          <span>▶</span> HyperClip
        </b>
        <span className="search-pill">Search something worth watching ⌕</span>
        <i>SS</i>
      </div>
      <div className="video-layout">
        <div className="app-sidebar">
          ⌂<br />◷<br />▤<br />♡
        </div>
        <div className="video-main">
          <div className="video-screen">
            <div className="screen-orbit" />
            <span className="screen-caption">
              a place for
              <br />
              <em>your perspective.</em>
            </span>
            <span className="play">▶</span>
            <div className="playback">
              <i /> <span>0:42 / 3:18   ▣</span>
            </div>
          </div>
          <div className="video-title">Your next idea starts here.</div>
          <div className="video-channel">
            <i>S</i>
            <span>
              Stories worth sharing<span>HyperClip creator community</span>
            </span>
            <b>Subscribe</b>
          </div>
        </div>
      </div>
    </div>
  );
}
