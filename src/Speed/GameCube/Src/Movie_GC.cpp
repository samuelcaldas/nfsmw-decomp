#include "G.hpp"

class GCHW_VD {
  public:
    ~GCHW_VD();
    void iDraw();
};

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
