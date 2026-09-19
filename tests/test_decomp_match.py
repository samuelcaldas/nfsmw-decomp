"""TDD test suite asserting 100% assembly matching for decompiled functions.

Following Test-Driven Development (TDD) principles:
1. Add a test asserting match for a target candidate function.
2. Run tests to observe failure (RED).
3. Refine the C++ implementation and compile with ninja.
4. Run tests to observe pass (GREEN).
5. Verify zero regressions with ninja changes.
"""

import json
from pathlib import Path
import subprocess
import unittest


def get_symbol_status(unit_name: str, symbol_name: str) -> dict:
    """Retrieve match status and percentage for a specific symbol."""
    cmd = [
        "python3",
        "tools/decomp-diff.py",
        "-u",
        unit_name,
        "--json",
    ]
    output = subprocess.check_output(cmd, encoding="utf-8")
    data = json.loads(output)
    for item in data:
        if item.get("symbol_name") == symbol_name:
            return item
    return {}


class TestDecompMatch(unittest.TestCase):
    """Assertions for 100.0% matching functions."""

    def assert_function_matches(self, unit_name: str, symbol_name: str) -> None:
        """Assert that a function achieves 100.0% match with zero unmatched bytes."""
        status = get_symbol_status(unit_name, symbol_name)
        self.assertTrue(
            bool(status),
            f"Symbol {symbol_name} not found in unit {unit_name}",
        )
        self.assertEqual(
            status.get("status"),
            "match",
            f"Expected status 'match' but got '{status.get('status')}' for {symbol_name} ({status.get('match_percent')}%)",
        )
        self.assertEqual(
            status.get("match_percent"),
            100.0,
            f"Expected 100.0% match but got {status.get('match_percent')}% for {symbol_name}",
        )
        self.assertEqual(
            status.get("unmatched_bytes_est"),
            0,
            f"Expected 0 unmatched bytes but got {status.get('unmatched_bytes_est')} for {symbol_name}",
        )

    def test_CheckUnplugged(self) -> None:
        """Verify cFEngJoyInput::CheckUnplugged is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe",
            "CheckUnplugged__13cFEngJoyInput",
        )

    def test_LoadedCustomHudTexturesCallback(self) -> None:
        """Verify HudResourceManager::LoadedCustomHudTexturesCallback is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "LoadedCustomHudTexturesCallback__18HudResourceManager",
        )

    def test_SetupMilestones(self) -> None:
        """Verify PostRacePursuitScreen::SetupMilestones is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "SetupMilestones__21PostRacePursuitScreen",
        )

    def test_SetupEvent(self) -> None:
        """Verify WorldMap::SetupEvent is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe",
            "SetupEvent__8WorldMap",
        )

    def test_NotificationMessage_UIMemcardList(self) -> None:
        """Verify UIMemcardList::NotificationMessage is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe",
            "NotificationMessage__13UIMemcardListUlP8FEObjectUlUl",
        )

    def test_NotificationMessage_EngageEventDialog(self) -> None:
        """Verify nsEngageEventDialog::EngageEventDialog::NotificationMessage is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "NotificationMessage__Q219nsEngageEventDialog17EngageEventDialogUlP8FEObjectUlUl",
        )

    def test_ClearData_ArrayScroller(self) -> None:
        """Verify ArrayScroller::ClearData is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "ClearData__13ArrayScroller",
        )

    def test_NotificationMessage_InGameAnyMovieScreen(self) -> None:
        """Verify InGameAnyMovieScreen::NotificationMessage is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "NotificationMessage__20InGameAnyMovieScreenUlP8FEObjectUlUl",
        )

    def test_emAddHandler(self) -> None:
        """Verify emAddHandler is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zTrack",
            "emAddHandler__FPFP7emEvent_vUi",
        )

    def test_RenderGroup(self) -> None:
        """Verify FEngine::RenderGroup is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFEng",
            "RenderGroup__7FEngineP7FEGroupR9FEMatrix4T2Us",
        )

    def test_CustomizeSpoiler_NotificationMessage(self) -> None:
        """Verify CustomizeSpoiler::NotificationMessage is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFeOverlay",
            "NotificationMessage__16CustomizeSpoilerUlP8FEObjectUlUl",
        )

    def test_SetupResults(self) -> None:
        """Verify PostRaceResultsScreen::SetupResults is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "SetupResults__21PostRaceResultsScreen",
        )

    def test_GetUnlockHash(self) -> None:
        """Verify CarCustomizeManager::GetUnlockHash is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFeOverlay",
            "GetUnlockHash__19CarCustomizeManager18eCustomizeCategoryi",
        )

    def test_GetLetterMap(self) -> None:
        """Verify FEKeyboard::GetLetterMap is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "GetLetterMap__10FEKeyboardi",
        )

    def test_SetNos(self) -> None:
        """Verify NitrousGauge::SetNos is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "SetNos__12NitrousGaugef",
        )

    def test_PanToCursor(self) -> None:
        """Verify WorldMap::PanToCursor is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe",
            "PanToCursor__8WorldMapf",
        )

    def test_UpdateElementArt(self) -> None:
        """Verify Minimap::UpdateElementArt is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe2",
            "UpdateElementArt__7MinimapP8bVector2T1P8FEObjectb",
        )

    def test_DrawPartName(self) -> None:
        """Verify FEShoppingCartItem::DrawPartName is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFeOverlay",
            "DrawPartName__18FEShoppingCartItem",
        )

    def test_ICEManager(self) -> None:
        """Verify ICEManager::ICEManager is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zCamera",
            "__10ICEManager",
        )

    def test_TrackStreamer_CheckLoadingBar(self) -> None:
        """Verify TrackStreamer::CheckLoadingBar is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zTrack",
            "CheckLoadingBar__13TrackStreamer",
        )

    def test_TexturesLoadedCallback(self) -> None:
        """Verify uiRepSheetRivalStreamer::TexturesLoadedCallback is 100% matched."""
        self.assert_function_matches(
            "main/Speed/Indep/SourceLists/zFe",
            "TexturesLoadedCallback__23uiRepSheetRivalStreamer",
        )


if __name__ == "__main__":
    unittest.main()
