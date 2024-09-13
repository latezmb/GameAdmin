set WORKSPACE=..

set GEN_CLIENT=%WORKSPACE%\Luban.ClientServer\Luban.ClientServer.exe
set CONF_ROOT=%WORKSPACE%\GameConfigs

@REM 项目根目录
set projectPath=..\..\Client\BallSort
@REM runtime模块脚本文件
set genModuleScriptPath=%projectPath%\src\game\table
@REM 导出配置文件路径
set exporConfigPath=%projectPath%\assets\config


%GEN_CLIENT% -j cfg --^
 -d %CONF_ROOT%\Defines\__root__.xml ^
 --input_data_dir %CONF_ROOT%\Datas ^
 --output_code_dir %genModuleScriptPath% ^
 --output_data_dir %exporConfigPath% ^
 --gen_types code_typescript_bin,data_bin ^
 --typescript:embed_bright_types ^
 -s all  ^
@REM --typescript:bright_require_path ../bright
pause