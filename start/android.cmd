cd %~dp0..\TextAdventureGauntlet
start emulator -avd n5
start react-native start
timeout 30
start react-native run-android
start react-native log-android
exit
