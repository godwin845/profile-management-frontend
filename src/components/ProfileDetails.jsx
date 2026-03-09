import EducationManager from "../Pages/Education/EducationManager";
import ExperienceManager from "../Pages/Experience/ExperienceManager";
import CertificateManager from "../Pages/Certification/CertificateManager";
import SkillsManager from "../Pages/Skills/SkillsManager";

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