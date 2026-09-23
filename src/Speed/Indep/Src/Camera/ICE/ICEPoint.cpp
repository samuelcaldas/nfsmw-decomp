#include "Speed/Indep/Src/Camera/ICE/ICEPoint.hpp"

namespace ICE {
/**
 * @brief Calculate coefficients for the cubic polynomial.
 */
void Cubic1D::MakeCoeffs() {
    this->Coeff[0] = (this->dVal + this->dValDesired) - 2.0f * (this->ValDesired - this->Val);
    this->Coeff[1] = ((this->ValDesired - this->Val) * 3.0f - this->dValDesired) - (this->dVal + this->dVal);
    this->Coeff[2] = this->dVal;
    this->Coeff[3] = this->Val;
}

/**
 * @brief Evaluate cubic polynomial value at t.
 */
float Cubic1D::GetVal(float t) const {
    return ((this->Coeff[0] * t + this->Coeff[1]) * t + this->Coeff[2]) * t + this->Coeff[3];
}

/**
 * @brief Evaluate first derivative of cubic polynomial at t.
 */
float Cubic1D::GetdVal(float t) const {
    return (2.0f * this->Coeff[1] + 3.0f * this->Coeff[0] * t) * t + this->Coeff[2];
}

/**
 * @brief Evaluate second derivative of cubic polynomial at t.
 */
float Cubic1D::GetddVal(float t) const {
    return 2.0f * this->Coeff[1] + 6.0f * this->Coeff[0] * t;
}

/**
 * @brief Get desired value.
 */
float Cubic1D::GetValDesired() const {
    return this->ValDesired;
}
} // namespace ICE
