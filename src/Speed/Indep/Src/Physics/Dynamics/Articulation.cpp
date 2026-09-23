#include "Speed/Indep/Src/Physics/Dynamics/Articulation.h"

namespace Dynamics {
namespace Articulation {

unsigned int Joint::mNextHandle = 1;
static bTList<Joint> Joints;

void Resolve() {
    for (Joint *j = Joints.GetHead(); j != Joints.EndOfList(); j = j->GetNext()) {
        j->Resolve();
    }
}

void Joint::OnDebugDraw() {}

bool Joint::Owns(const IEntity *entity) const {
    if (entity == this->mLeverA.GetEntity() || entity == this->mLeverB.GetEntity()) {
        return true;
    }
    return false;
}

void Lever::OnDebugDraw() {}

void Constraint::OnDebugDraw() {}

} // namespace Articulation
} // namespace Dynamics
