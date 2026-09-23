#include "Speed/Indep/Src/Physics/PhysicsObject.h"

/**
 * @brief Gets the entity associated with this physics object.
 */
Sim::IEntity *PhysicsObject::GetEntity() const {
    return this->mEntity;
}

/**
 * @brief Gets the simable type of this physics object.
 */
SimableType PhysicsObject::GetSimableType() const {
    return this->mObjType;
}

/**
 * @brief Gets the player associated with this physics object.
 */
IPlayer *PhysicsObject::GetPlayer() const {
    return this->mPlayer;
}

/**
 * @brief Gets the owner handle of this physics object.
 */
HSIMABLE PhysicsObject::GetOwnerHandle() const {
    return this->mOwner;
}

/**
 * @brief Gets the attributes instance of this physics object.
 */
const Attrib::Instance &PhysicsObject::GetAttributes() const {
    return this->mAttributes;
}

/**
 * @brief Gets the rigid body associated with this physics object.
 */
IRigidBody *PhysicsObject::GetRigidBody() {
    return this->mRigidBody;
}
