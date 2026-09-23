#ifndef CAMERA_ICE_ICEPOINT_H
#define CAMERA_ICE_ICEPOINT_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

namespace ICE {
class Cubic1D {
public:
    void MakeCoeffs();
    float GetVal(float t) const;
    float GetdVal(float t) const;
    float GetddVal(float t) const;
    float GetValDesired() const;
    float GetDerivative(float t) const;
    float GetSecondDerivative(float t) const;
    void ClampDerivative(float maxDeriv);
    void ClampSecondDerivative(float maxSecondDeriv);
    void Update(float dt, float valDesired, float dValDesired);
private:
    float Val; // offset 0x0
    float dVal; // offset 0x4
    float ValDesired; // offset 0x8
    float dValDesired; // offset 0xC
    float Coeff[4]; // offset 0x10..0x1C
    float duration; // offset 0x20
};
} // namespace ICE

#endif
