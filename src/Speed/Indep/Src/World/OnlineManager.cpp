#include "OnlineManager.hpp"

OnlineManager TheOnlineManager;

void OnlineManager::InitQuantizers() {}

namespace {
struct OnlineManagerInitializer {
    OnlineManagerInitializer() {
        TheOnlineManager.InitQuantizers();
    }
};

OnlineManagerInitializer gOnlineManagerInitializer;
} // namespace
