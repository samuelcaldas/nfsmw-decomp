#ifndef IAUDIBLE_H
#define IAUDIBLE_H

#include "Speed/Indep/Libs/Support/Utility/UCOM.h"

class IAudible : public UTL::COM::IUnknown {
  public:
    static HINTERFACE _IHandle();

  protected:
    ~IAudible() override {}
    IAudible(UTL::COM::Object *owner) : UTL::COM::IUnknown(owner, (HINTERFACE)_IHandle) {}

  private:
    IAudible(const IAudible &);
    const IAudible &operator=(const IAudible &);

  public:

    virtual bool IsAudible() const = 0;
};

#endif
