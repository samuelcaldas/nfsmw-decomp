#include "./sndcmn.h"

/**
 * @brief Returns the programmed volume for a sound stream.
 */
int SNDSTRM_getprogvol(int sndstreamhandle) {
    SNDSTREAMCHANNEL *pssc = SNDSTRMI_getstreamptr(sndstreamhandle);

    int vol = -8;
    if (pssc == 0) {
        return vol;
    }

    vol = SNDCTRL_getprogvol(pssc->shandle);
    if (vol >= 0) {
        return vol;
    }

    return SNDI_ftoifast(pssc->sourceChannelState[0].vol * 127.0f);
}
