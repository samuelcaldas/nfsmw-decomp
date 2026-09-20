#ifndef EVENTS_EDESTROYVEHICLE_H
#define EVENTS_EDESTROYVEHICLE_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

#include "Speed/Indep/Src/Main/Event.h"

// total size: 0xc
class EDestroyVehicle : public Event {
  public:
    // total size: 0x4
    struct StaticData : public Event::StaticData {};

    // enum { kEventID = 0 };

    EDestroyVehicle(unsigned int phSimable);

    ~EDestroyVehicle() override;

    const char *GetEventName() const override;

  private:
    unsigned int fhSimable; // offset: 0x8, size 0x4
};

#endif
