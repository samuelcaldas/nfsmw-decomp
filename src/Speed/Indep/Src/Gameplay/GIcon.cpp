#include "GIcon.h"

/**
 * @brief Checks whether the requested flag bits are set.
 * @param mask Flag bits to test.
 * @return True when any requested bit is set.
 */
bool GIcon::IsFlagSet(unsigned int mask) const {
    return (mFlags & mask) != 0;
}
