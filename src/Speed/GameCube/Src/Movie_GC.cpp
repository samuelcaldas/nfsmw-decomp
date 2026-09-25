#include "G.hpp"

struct tBigYUVSwizzler;
void DELETE_tBigYUVSwizzler(tBigYUVSwizzler *swizzler);

class GCHW_VD {
  public:
    tBigYUVSwizzler *fSwizzler;

    ~GCHW_VD();
    void iDraw();
};

GCHW_VD::~GCHW_VD() {
    DELETE_tBigYUVSwizzler(this->fSwizzler);
}

extern GCHW_VD *gGCVD;

void GCDrawMovie() {
    if (gGCVD != 0) {
        gGCVD->iDraw();
    }
}

unsigned int RCMP_GetMaxFramesOutStanding() { return 2; }

void PlatFinishMovie() {
    if (gGCVD != 0) {
        delete gGCVD;
        gGCVD = 0;
    }
}
