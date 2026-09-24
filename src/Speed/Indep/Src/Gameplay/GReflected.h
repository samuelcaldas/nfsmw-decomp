#ifndef GREFLECTED_H__
#define GREFLECTED_H__

class GRuntimeInstance;

// total size: 0x4
struct GCollectionKey {
    unsigned int mCollectionKey; // offset 0x0, size 0x4

    GCollectionKey() {}
    GCollectionKey(unsigned int key) : mCollectionKey(key) {}
    GCollectionKey(GRuntimeInstance *instance);
    operator GRuntimeInstance *() const;
};

#endif
