#ifndef FEGROUP_H_
#define FEGROUP_H_

#include "FEObject.h"

// total size: 0x6C
// Decl: 28
/**
 * @brief Represents a group container object in the frontend engine holding child objects.
 */
class FEGroup : public FEObject {
  private:
    FEMinList Children; // offset 0x5C, size 0x10, Decl: 30

  public:
    /**
     * @brief Constructs an empty FEGroup object.
     */
    FEGroup() { // Decl: 33
        Type = FE_Group;
    }
    FEGroup(const FEGroup &Object, bool bCloneChildren, bool bReference);

    /**
     * @brief Clones the FEGroup object.
     */
    FEObject *Clone(bool bReference) override { // Decl: 36
        return FNEW FEGroup(*this, true, bReference);
    }

    void AddObject(FEObject *pObj) { // Decl: 38
        Children.AddTail(pObj);
    }
    void AddObjectAfter(FEObject *pObj, FEObject *pAddAfter) { // Decl: 39
        Children.AddNode(pAddAfter, pObj);
    }

    void RemoveObject(FEObject *pObj) { // Decl: 41
        Children.RemNode(pObj);
    }

    u32 GetNumChildren() const {
        return Children.GetNumElements();
    }

    FEObject *GetFirstChild() const {
        return static_cast<FEObject *>(Children.GetHead());
    }
    FEObject *GetLastChild() const {
        return static_cast<FEObject *>(Children.GetTail());
    }

    FEObject *FindChild(u32 NameHash) const;
    FEObject *FindChild(const char *pName) const;

    FEObject *FindChildRecursive(u32 NameHash) const;
    FEObject *FindChildRecursive(const char *pName) const;
};

#endif
