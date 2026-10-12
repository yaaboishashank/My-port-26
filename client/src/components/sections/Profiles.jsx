import SectionMeta from '../common/SectionMeta.jsx';
import BrandIcon from '../common/BrandIcon.jsx';
import ExternalLink from '../common/ExternalLink.jsx';

function ProfileCard({ profile }) {
  const Wrapper = profile.url ? ExternalLink : 'div';
  const props = profile.url ? { href: profile.url } : {};
  return (
    <Wrapper {...props} className={`profile-card reveal-target${profile.url ? '' : ' pending'}`}>
      <span className="profile-icon">
        <BrandIcon name={profile.id} className="social-icon" />
      </span>
      <div>
        <h3>{profile.name}</h3>
        <p>{profile.description}</p>
        <span className="profile-handle mono">
          {profile.url ? profile.handle : 'Profile link pending'}
        </span>
      </div>
      <span className="profile-arrow" aria-hidden="true">
        {profile.url ? '↗' : '—'}
      </span>
    </Wrapper>
  );
}

export default function Profiles({ profiles }) {
  return (
    <section className="profiles section wrap" id="profiles">
      <SectionMeta
        number="05"
        title="ELSEWHERE ONLINE"
        note="THE PERSON. THE PROJECTS. THE CONVERSATIONS."
      />
      <div className="profiles-heading reveal-target">
        <h2>
          Let’s stay
          <br />
          <em>connected.</em>
        </h2>
        <p>
          Explore my work, connect professionally,
          <br />
          or follow along as I build.
        </p>
      </div>
      <div className="profiles-grid">
        {profiles.map((profile) => (
          <ProfileCard profile={profile} key={profile.id} />
        ))}
      </div>
    </section>
  );
}
