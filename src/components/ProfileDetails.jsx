import EducationManager from "../pages/Education/EducationManager";
import ExperienceManager from "../pages/Experience/ExperienceManager";
import CertificateManager from "../pages/Certification/CertificateManager";
import SkillsManager from "../pages/Skills/SkillsManager";

const ProfileDetails = () => {
  return (
    <div className="mt-6 mb-12 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-8">
          <SkillsManager />
          <ExperienceManager />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          <EducationManager />
          <CertificateManager />
        </div>

      </div>
    </div>
  );
};

export default ProfileDetails;